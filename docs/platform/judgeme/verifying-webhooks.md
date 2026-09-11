---
title: "Help: verifying webhooks"
source: "https://judge.me/help/en/articles/8299679-verifying-webhooks-from-judge-me"
final_url: "https://judge.me/help/en/articles/8299679-verifying-webhooks-from-judge-me"
platform: "judgeme"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "c3aafe9de97a23513c8cb34426405221eb619925725b96f4664ef6e1e31c8145"
---

# **Step 1: Get the secret string from creating an OAuth app**

- Start by creating an OAuth app as shown in [this guide](https://help.judge.me/en/articles/8283047-setting-up-the-oauth-flow-for-your-app-in-judge-me).
- Follow the steps to get the secret string, like the one in the screenshot below.

**Note**: The secret used to sign the `JUDGEME-HMAC-SHA256` header depends on how the webhook was created:

- If the webhook was created through an OAuth app, use the OAuth app's secret key (shown in [Step 1](#h_e8e5713598) above).
- If the webhook was created using your store's Private API token (e.g. via the API directly), use that same Private API token as the secret.

Make sure you're using the secret that matches how your webhook was set up. Using the wrong secret is a common reason why webhook verification fails.

# **Step 2: Set up a webhook for the callback URL**

- Create a webhook to get important data from Judge.me. This helps information flow smoothly into your system.
- Go to this link: **[Judge.me Webhooks Documentation](https://judge.me/api/docs#tag/Webhooks/operation/webhooks#create)** for detailed instructions.
- Make sure your webhook uses an HTTPS URL with a valid SSL certificate for secure data transfer.
- Be careful with the structure of your data (JSON or XML). It depends on the webhook event, so it can vary.

By following these steps, you'll set up a strong webhook for secure and organized data transfer from Judge.me to your system.

# **Step 3: Receive webhook requests**

Once you've registered, Judge.me helps by sending messages to your chosen web address whenever something important happens.

This way, you get quick updates and important info. In this part, we'll talk about how this works and why it's important to have the right setup with secure certificates.

**Step details:**

- **Register an Endpoint**: Once your endpoint is registered with Judge.me, communication is established.
- **Event-Triggered Requests**: Judge.me sends HTTP POST requests whenever specific events occur, ensuring real-time updates.
- **Data Parameters**: These requests contain JSON or XML data relevant to the event, enabling effective responses.
- **SSL Security**: SSL certificates are verified for secure data transmission, safeguarding your interactions.
- **Server Configuration**: Ensure your server supports HTTPS and has a valid SSL certificate for reliable data reception.

Receiving webhooks from Judge.me involves a systematic process of event-triggered HTTP POST requests with secure SSL transmission, ensuring effective and secure communication.

# **Step 4: Verify the webhook**

Before responding to a webhook, it's essential to make sure the webhook is sent from Judge.me. This verification process involves calculating a digital signature.

- **Calculate the Digital Signature:** In every webhook request, you'll find a `JUDGEME-HMAC-SHA256` header. This header is meticulously generated using the secret key derived from the OAuth app mentioned earlier, in conjunction with the data embedded within the request.
- **Compute the HMAC Digest:** Apply the designated algorithm for computing the HMAC digest. Refer to the provided code examples below for practical implementation guidance.
- **Compare and Confirm:** The crux of the verification lies in comparing the computed HMAC digest with the value encapsulated within the `JUDGEME-HMAC-SHA256` header. A successful match unequivocally indicates that the webhook's source is Judge.me.

**Note:**

Depending on your web server's configuration, the header name can be automatically changed to `HTTP_X_JUDGEME_HMAC_SHA256` or `X-Judgeme-Hmac-SHA256`. To ensure thorough inspection, check for all headers within the request, particularly if our header isn't readily identifiable.

​**Ruby code example:**

```
# Demonstrating webhook verification using Ruby and the Sinatra web framework:  
  
require 'rubygems'  
require 'base64'  
require 'openssl'  
require 'sinatra'  
require 'active_support/security_utils'  
  
# Your Judge.me app's API secret key, accessible from OAuth app creation in step 1. For production, use an environment variable to safeguard the key.  
  
API_SECRET_KEY = 'my_api_secret_key'  
  
helpers do  
  # Compare calculated HMAC digest based on API secret key and request contents with reported HMAC in headers  
  def verify_webhook(data, hmac_header)  
    calculated_hmac = OpenSSL::HMAC.hexdigest(digest, API_SECRET_KEY, data)  
    ActiveSupport::SecurityUtils.secure_compare(calculated_hmac, hmac_header)  
  end  
end  
  
# Respond to HTTP POST requests sent to this web service  
post '/' do  
  request.body.rewind  
  data = request.body.read  
  verified = verify_webhook(data, env["JUDGEME-HMAC-SHA256"])  
  halt 401 unless verified  
  # Process webhook payload  
  # ...  
end
```

**PHP code example:**

```
# Demonstrating webhook verification using PHP:  
  
<?php  
define('API_SECRET_KEY', 'my_api_secret_key'); // Your Judge.me app's API secret key  
  
function verify_webhook($data, $hmac_header)  
{  
  $calculated_hmac = hash_hmac('sha256', $data, API_SECRET_KEY);  
  return hash_equals($hmac_header, $calculated_hmac);  
}  
  
$hmac_header = $_SERVER['JUDGEME-HMAC-SHA256'];  
$data = file_get_contents('php://input');  
$verified = verify_webhook($data, $hmac_header);  
  
error_log('Webhook verified: '.var_export($verified, true)); // Check error.log to see the result  
  
if ($verified) {  
  # Process webhook payload  
  # ...  
} else {  
  http_response_code(401);  
}  
?>
```

**Python code example:**

```
# Demonstrating webhook verification using Python and the Flask framework:  
  
from flask import Flask, request, abort  
import hmac  
import hashlib  
import base64  
  
app = Flask(__name__)  
  
API_SECRET_KEY = 'my_api_secret_key'  # Your Judge.me app's API secret key  
  
def verify_webhook(data, hmac_header):  
    computed_hmac = hmac.new(API_SECRET_KEY.encode('utf-8'), data, digestmod=hashlib.sha256).hexdigest()  
    return hmac.compare_digest(computed_hmac, hmac_header)  
  
@app.route('/webhook', methods=['POST'])  
def handle_webhook():  
    data = request.get_data()  
    verified = verify_webhook(data, request.headers.get('JUDGEME-HMAC-SHA256'))  
  
    if not verified:  
        abort(401)  
  
    # Process webhook payload  
    # ...  
  
    return ('', 200)
```

These code examples showcase how to verify webhooks using different programming languages (Ruby, PHP, and Python) along with their respective frameworks.

By following these examples, you can implement webhook verification for enhanced security and accurate data processing.

---

Related Articles

- [Build integrations with Judge.me](https://judge.me/help/en/articles/8278390-build-integrations-with-judge-me)
- [Setting up OAuth](https://judge.me/help/en/articles/8283047-setting-up-oauth)
- [Tracking orders and revenue referred from Judge.me Reviews site](https://judge.me/help/en/articles/8403695-tracking-orders-and-revenue-referred-from-judge-me-reviews-site)
- [Partner with Judge.me](https://judge.me/help/en/articles/8403959-partner-with-judge-me)
- [Integrating with Drip to automate email follow-ups based on review ratings](https://judge.me/help/en/articles/15251535-integrating-with-drip-to-automate-email-follow-ups-based-on-review-ratings)
