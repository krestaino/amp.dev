/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const SampleRenderer = require('@examples/lib/SampleRenderer');
const {createRequestContext} = require('@lib/templates/index.js');
const utils = require('@lib/utils');
const randomString = require('randomstring');
const nunjucks = require('nunjucks');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());

// TODO check if cookie is really necessary
const AMP_ANALYTICS_COOKIE = 'cid-scope';
const EVENTS = {};
const USER_CHANGE_LISTENERS = {};
const GLOBAL_ANALYTICS = '__all_users__';
const embedFilePath = utils.project.absolute('/examples/static/samples/files/embed.html');
const analyticsTemplate = nunjucks.compile(`
    <table>
    <tr>
      <th>Event</th>
      <th>Count</th>
    </tr>
    {% for key, value in data %}
    <tr>
      <td>{{key}}</td><td>{{value}}</td>
    </tr>
    {% else %}
      No data available.
    {% endfor %}
    </table>`.replace(/\n/g, ''));

SampleRenderer.use(examples, (request, response, template) => {
  let user = request.cookies[AMP_ANALYTICS_COOKIE];
  if (!user) {
    user = randomString.generate(8);
  }
  response.send(template.render(createRequestContext(request, {user})));
});

/**
 * Registers an event for the given account.
 *
 * Example: /amp-analytics/ping?acccount=AN_ACCOUNT&event=AN_EVENT
 */
examples.post('/ping', (request, response) => {
  const account = request.query.account;
  const event = request.query.event;
  const user = request.query.user;
  if (!trackEvent(account, event, user)) {
    response.sendStatus(400);
    return;
  }
  response.sendStatus(200);
});

examples.get('/embed', (request, response) => {
  const account = request.query.account;
  const user = request.query.user;
  const analytics = forUser(account, user);
  response.render(embedFilePath, {
    account: account,
    user: user,
    data: analytics,
  });
});

examples.get('/embed/listen', (request, response) => {
  const account = request.query.account;
  const user = request.query.user;
  if (!account || !user) {
    response.sendStatus(400);
  }
  console.log('new connection for user ' + user);
  response.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  const onNewAnalyticsData = function(userData) {
    const content = analyticsTemplate.render({data: userData});
    console.log('received user event ' + content);
    response.write('data: ' + content + '\n\n');
  };

  const userData = forUser(account, user);
  onNewAnalyticsData(userData);

  addUserListener(user, onNewAnalyticsData);
  request.on('close', () => {
    removeUserListener(user, onNewAnalyticsData);
  });
});

/**
 * Add user analytics change listener.
 */
function addUserListener(userId, callback) {
  let listeners = USER_CHANGE_LISTENERS[userId];
  if (!listeners) {
    listeners = [];
    USER_CHANGE_LISTENERS[userId] = listeners;
  }
  listeners.push(callback);
};

/**
 * Remove user analytics change listener.
 **/
function removeUserListener(userId, callback) {
  const listeners = USER_CHANGE_LISTENERS[userId];
  if (!listeners) {
    console.log('error: no listener registered for user ' + user);
    return;
  }
  const index = listeners.indexOf(callback);
  if (index == -1) {
    return;
  }
  listeners.splice(index, 1);
};

/**
 * Returns analytics for the given user and account.
 */
function forUser(account, user) {
  const accountData = EVENTS[account];
  if (!accountData) {
    return '';
  }
  return formatData(accountData[user]);
}

function trackEvent(account, event, user) {
  console.log('track ' + account + ';' + event + ';' + user);
  if (!account || !event) {
    return false;
  }
  trackUserEvent(account, event, GLOBAL_ANALYTICS);
  if (user) {
    trackUserEvent(account, event, user);
  }
  return true;
}

function trackUserEvent(account, event, user) {
  const accountData = get(EVENTS, account);
  const userData = get(accountData, user);
  inc(userData, event);
  notifyListeners(user, userData);
}

function get(obj, prop) {
  let value = obj[prop];
  if (!value) {
    value = {};
    obj[prop] = value;
  }
  return value;
}

function inc(data, event) {
  let eventCount = data[event];
  if (!eventCount) {
    eventCount = 0;
  }
  return data[event] = eventCount + 1;
}

function notifyListeners(user, data) {
  const listeners = USER_CHANGE_LISTENERS[user];
  if (!listeners) {
    console.log('no listeners for user events ' + user);
    return;
  }
  console.log('notify listeners for user events ' + user);
  const formattedData = formatData(data);
  listeners.forEach((listener) => {
    listener(formattedData);
  });
}

/**
 * Make our analytics data mustache compatible.
 */
function formatData(object) {
  const result = [];
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      result.push({
        key: prop,
        value: object[prop],
      });
    }
  }
  return result;
}

module.exports = examples;
