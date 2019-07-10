---
$category@: media
formats:
- websites
- ads
teaser:
  text: Bir YouTube videosu görüntüler.
---

<!--- Reformatted by Reftar! for AMP (go/reftar) on 2019-06-13 -->
<!---
       Copyright 2015 The AMP HTML Authors. Tüm Hakları Saklıdır.

       Apache Lisansı, Sürüm 2.0 ("Lisans") ile lisanslıdır; bu dosyayı Lisans koşulları dışında kullanamazsınız.
       Lisansın bir kopyasını şu adresten edinebilirsiniz:

       http://www.apache.org/licenses/LICENSE-2.0

       Geçerli yasa tarafından gerekli görülmediği veya yazılı olarak bir sözleşme yapılmadığı sürece, Lisanslı olarak dağıtılan yazılım açıkça veya zımni olarak HİÇBİR GARANTİ VEYA KOŞUL SUNULMADAN "OLDUĞU GİBİ" dağıtılır.
       Lisans kapsamında belirli bir dilde sağlanan izinleri ve uygulanan kısıtlamaları öğrenmek için söz konusu dille ilgili Lisans'a bakın.
  -->

#amp-youtube

Bir [YouTube](https://www.youtube.com/) videosu görüntüler.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">amp-youtube için ek açıklamalı kod örneği</a></td>
  </tr>
</table>

[İçindekiler]

##Örnek

Duyarlı düzenle, örnekteki genişlik ve yükseklik, 16:9 en boy oranlı videolar için doğru düzenler sağlamalıdır:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

##Özellikler

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Bu özellik mevcutsa ve tarayıcı otomatik oynatmayı destekliyorsa:
      <ul>
        <li>otomatik oynatma başlamadan önce videonun sesi otomatik olarak kapatılır
        </li>
        <li>video görünüm alanının dışında kaldığında video duraklatılır
        </li>
        <li>video görünüm alanına tekrar girdiğinde video oynatılmaya devam eder
        </li>
        <li>kullanıcı videoya dokunduğunda videonun sesi açılır
        </li>
        <li>kullanıcı videoyla etkileşime geçtiyse (ör. sesi kapatma/açma, duraklatma/devam ettirme vb.) ve video görünüm alanının dışında kaldıysa veya görünüm alanına girdiyse videonun durumu, kullanıcının bıraktığı şekilde kalır. Örneğin, kullanıcı videoyu duraklattıktan sonra videoyu görünüm alanının dışına çıkarır ve ardından, videoya geri dönerse video duraklatılmış olarak kalır.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>YouTube video kimliği, her YouTube video sayfası URL'sinde bulunur.
          Örneğin, https://www.youtube.com/watch?v=Z1q71gFeRqM URL'sinde <code>Z1q71gFeRqM</code> kısmı, video kimliğidir.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>Sabit bir canlı yayın url'si sağlayan YouTube kanal kimliği. Örneğin, https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q URL'sinde <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> kısmı, kanal kimliğidir. Bir video yerine canlı yayın için sabit bir url yerleştirmek isterseniz <code>data-videoid</code> özelliği yerine bir <code>data-live-channelid</code> özelliği sağlayabilirsiniz. Kanallar, varsayılan yer tutucularla birlikte sağlanmaz. Video için yukarıdaki 2. örnekte olduğu gibi bir yer tutucu sağlayabilirsiniz.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Tüm <code>data-param-*</code> özellikleri, YouTube iframe src'ye sorgu parametresi olarak eklenir. Bu, kontrollerin gösterilip gösterilmeyeceği gibi özel değerlerin YouTube eklentilerine geçirilmesi için kullanılabilir.
            Anahtarlar ve değerler URI kodlu olur. Anahtarlarda büyük/küçük harf karışık kullanılır.
            <ul>
            <li>`data-param-controls=1`, `&amp;controls=1` olur</li>
          </ul>
          YouTube ile ilgili daha fazla parametre seçeneği için <a href="https://developers.google.com/youtube/player_parameters">YouTube Yerleşik Oynatıcı Parametreleri</a> konusuna bakın.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong><code>amp-video-docking</code> uzantısını gerektirir.</strong> Bu özellik mevcutsa ve video manuel olarak oynatılıyorsa kullanıcı, video bileşeninin görsel alanını görünüm alanının dışına kaydırdığında video “küçültülür” ve bir köşeye veya bir öğeye sabitlenir.
            Daha ayrıntılı bilgi için <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-video-docking/amp-video-docking.md">yuvaya yerleştirme uzantısının kendisiyle ilgili dokümanlara</a> bakın.</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (isteğe bağlı)</strong></td>
          <td><a href="https://fetch.spec.whatwg.org/">Getirme API'si</a> tarafından belirtildiği şekliyle bir <code>credentials</code> seçeneğini tanımlar.
            <ul>
              <li>Desteklenen değerler: `omit`, `include`</li>
              <li>Varsayılan: `include`</li>
            </ul>
            <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">YouTube oynatıcısının gelişmiş gizlilik modunda</a> kullanmak istiyorsanız <code>omit</code> değerini geçirin.
                YouTube genellikle çerezlerini oynatıcı yüklenirken ayarlar. Gelişmiş gizlilik modunda çerezler, kullanıcı oynatıcıyı tıkladığında ayarlanır.</td>
            </tr>
            <tr>
              <td width="40%"><strong>common attributes</strong></td>
              <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="https://www.ampproject.org/docs/reference/common_attributes">ortak özellikleri</a> içerir.</td>
            </tr>
          </table>

##Doğrulama

AMP doğrulayıcı spesifikasyonundaki [amp-youtube kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube/validator-amp-youtube.protoascii) bakın.