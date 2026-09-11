---
title: "Help: sharing reviews on social media"
source: "https://judge.me/help/en/articles/8314924-sharing-reviews-automatically-on-social-media"
final_url: "https://judge.me/help/en/articles/8314924-sharing-reviews-as-facebook-posts"
platform: "judgeme"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "c8c6372c86b4c699968fd88ecb2cc6276aa88996a544a83d59eee253d0136fa5"
---

# Considerations

- Your Facebook connection will expire automatically after **2 months** due to Facebook’s access token policy. To keep sharing reviews without interruption, reconnect your Facebook accounts in Judge.me at least once every 2 months.
- If you're looking to show reviews in your Facebook and Instagram shops, not to share reviews as posts in your Facebook page, check out [Meta syndication](https://judge.me/help/en/articles/8362521-showing-reviews-in-facebook-and-instagram-shops-with-meta-syndication) instead.
- Reviews with only star ratings are not shared to Facebook automatically. They can still be shared manually.

---

# Connect your Facebook account

To start sharing reviews on Facebook, first connect your Facebook account to Judge.me:

1. From your Judge.me admin, go to **[Settings > Integrations > Facebook and Instagram](https://app.judge.me/settings/integration_settings?app=facebook-and-instagram)**.
2. Click **Continue with Facebook** then follow the steps to connect your Facebook account.
3. Click **Activate** next to the Facebook page you want to connect.

---

# Customize the Facebook push template (optional)

Available on the Awesome plan

You can edit the Facebook push template to control how your reviews appear when shared on Facebook.

To customize the Facebook push template:

1. From your Judge.me admin, go to **[Settings > Social sharing > Automatic social push](https://app.judge.me/settings/reviews/social_push)**.
2. Scroll down to the **Push Template** section at the bottom.
3. In the **Facebook** tab, adjust the push template to your likings.
4. For reviews without a photo, we will automatically use the product image in the post. For reviews with photos, to choose whether to use the review image or the product image:

   - For **Reviews with photos**, select one of the following options:

     - "Include a photo of the review" to use the customer-uploaded photos
     - "Include the product image" to use the product image
5. Click **Save**.

Default Facebook push template:

*`{{ review_rating_emoji }}` `{{ review_rating }}` star review from `{{ reviewer_name }}`: `{{ review_title }}`*

*`{{ review_body }}`*

*`{{ product_url }}`*

Variables you can use in the Facebook push template:

- {{ reviewer\_first\_name }}
- {{ reviewer\_last\_name }}
- {{ reviewer\_name }}
- {{ review\_rating\_emoji }}
- {{ review\_rating }}
- {{ review\_title }}
- {{ review\_body }}
- {{ product\_url }}

---

# Share reviews to Facebook manually

Available on the Free plan

Once you've connected your Facebook account to Judge.me, to manually share a review as a post on your Facebook page:

1. From your Judge.me admin, go to **[Reviews](https://app.judge.me/index)**.
2. Find the review you want to share.
3. Click the 3-dot icon (**...**) on the right of that review.
4. Select **Share on social media**.
5. Select **Facebook**.
6. A pop-up will appear showing the Facebook push template. You can edit the text for this specific post (e.g. add hashtags, mentions, or emojis) or leave it as is if you’re happy with the template content.
7. Click **Publish post** to share the review on Facebook.

---

# Share reviews to Facebook automatically

Available on the Awesome plan

Once you've connected your Facebook account to [Judge.me](http://Judge.me), you can automatically share reviews as posts on your Facebook page:

**If you're not part of the [Early users program](https://judge.me/help/en/articles/8389897-judge-me-early-user-program):**

1. From your Judge.me admin, go to **[Settings > Social sharing > Automatic social push](https://app.judge.me/settings/reviews/social_push)**.
2. Scroll down to the **Automatic push criteria** section.
3. Select "Enable automatic social push".
4. In the **Choose percentage of new reviews to post** field: enter the percentage of new reviews to share automatically (0-100).
5. In the **Minimum review rating** dropdown, choose from the following options:

   - "All reviews"
   - "2 stars"
   - "3 stars"
   - "4 stars"
   - "5 stars"
6. Check the box next to "Only post reviews with photos" if you only want to share reviews with photos.
7. Check the box next to "Only post reviews from verified buyers" if you only want to share reviews from verified customers.
8. In the **Time interval** dropdown, set how long to wait before sharing another review post:

   - "Right away"
   - "Every 30 minutes"
   - "Every 1 hour"
   - "Every 3 hours"
   - "Every 6 hours"
   - "Every 12 hours"
   - "Every 24 hours"
9. Click **Save**.

**Note**:

If you’ve also connected your [Instagram](https://judge.me/help/en/articles/12674112-sharing-reviews-as-instagram-posts) or [X](https://judge.me/help/en/articles/8957011-sharing-reviews-as-x-posts-formerly-twitter) account, the same reviews will be automatically shared there.

To stop sharing reviews to Facebook, Instagram, and X:

1. From your Judge.me admin, go to **[Settings > Social sharing > Automatic social push](https://app.judge.me/settings/reviews/social_push)**.
2. Scroll down to the **Automatic push criteria** section.
3. Select "Disabled".
4. Click **Save**.

**If you're part of the [Early users program](https://judge.me/help/en/articles/8389897-judge-me-early-user-program):**

1. From your Judge.me admin, go to **[Settings > Social sharing](https://app.judge.me/settings/reviews/social_sharing)**.
2. In the **Automatic social push** card, click **Manage settings**.  
   ​
3. Turn on **Automatically post reviews to your connected platforms**.
4. Under **Post to**, turn on **Facebook**.  
   ​

   ​
5. Click the **Filters** row to set which reviews are eligible for sharing:  
   ​

   - Open the **Review rating** dropdown to set a minimum star rating.
   - (Optional) Check **Only reviews with photos** to share only reviews that include customer photos.
   - (Optional) Check **Only verified reviews** to share only reviews from verified buyers.
   - Click **Save** in the Filters modal.  
     ​
6. Click the *S***chedule and volume** row to set when reviews are posted:  
   ​

   - (Optional) Check **Share my existing reviews** to also share reviews you've already collected.
   - Under **Posting schedule**, click **+** next to each day you want to post, then select the hour from the dropdown. Times use your store's timezone.
   - You can add multiple time slots per day. Days without a time slot show "Don't post" and are skipped.
   - Click **Save** in the Schedule modal.  
     ​
7. Click **Save**.

At each scheduled time slot, the app picks one qualifying review and posts it to your Facebook page. Reviews are selected randomly so your social feed stays varied. The app only posts when a matching review is available — if no new review meets your filters at a scheduled time, that slot is skipped.  
​

**Notes**:

- If you've also connected Instagram or X, you can turn them on individually under **Post to**. Each platform gets its own review at each scheduled time slot.
- **Already using the old automatic social push?** Your current setup keeps working unchanged. You only switch to the new day/time schedule when you open **Schedule and volume** and click **Save**.

To stop sharing reviews to Facebook only:

1. From your Judge.me admin, go to **[Settings > Social sharing](https://app.judge.me/settings/reviews/social_sharing)**.
2. In the **Automatic social push** card, click **Manage settings**.
3. Under **Post to**, **turn off** Facebook.
4. Click **Save**.

To stop all automatic sharing, turn off **Automatically post reviews to your connected platforms** and click **Save**.

---

# Post activity

Available for [early users program participants](https://judge.me/help/en/articles/8389897-judge-me-early-user-program)

Every review shared to Facebook — whether automatic or manual — appears in the **Post activity** log. You can find it following the steps below:

1. From your Judge.me admin, go to **[Settings > Social sharing](https://app.judge.me/settings/reviews/social_sharing)**.
2. In the **Automatic social push** card, click **Manage settings**.
3. Scroll down and click **Post activity**.  
   ​

Each entry shows the review, platform, status, date, and whether it was shared automatically or manually. You can filter the log by platform, status, and origin.

- **Success** — the review was posted. Click **View post ↗** to see it on Facebook.
- **Failed** — the post failed. The reason is shown below the status. Click **Retry** if available, or reconnect your account if prompted. Some failures show Can't be retried when the issue is permanent (e.g. content policy violation).
- **In progress** — the post is being processed (rare for Facebook).

If a platform fails several times in a row, it is automatically paused to prevent a broken connection from using up your scheduled slots. Once you reconnect and a post succeeds, automatic posting resumes on its own.

---

# Troubleshoot

---

**Authentication section stuck on loading**

When connecting your Facebook account to Judge.me, if you see a loading icon instead of the **Continue with Facebook** button, you can access the setting via this link instead <https://app.judge.me/settings/integration_settings?app=facebook-and-instagram&redesign=1>.

---

**I don't see the Facebook page I want to connect**

When connecting your Facebook account to Judge.me, if you don't see the Facebook page you want to connect, first check if you have [Facebook access to a Page](https://www.facebook.com/business/help/1101781386943864).

If you have the Page access, continue to follow these steps:

**Step 1: Remove the Judge.me integration in your Facebook account**

1. Log into Facebook, then click your profile photo in the top right.
2. Click **Settings & privacy** > **Settings**.
3. In the menu on the left, scroll down to **Business integrations**.
4. Find "Judge.me" and click **Remove**.
5. In the next popup, click **Remove** again.

**Step 2: Connect your Facebook account to Judge.me again**

1. From your Judge.me admin, go to **[Settings > Social sharing > Automatic social push](https://app.judge.me/settings/reviews/social_push)**.
2. Click **Continue with Facebook** then follow the steps to connect your Facebook account. You should see all your managed Facebook pages now.
3. Click **Activate** next to the Facebook page you want to connect.

---

---

# Resources

1. **See our latest updates:**

   ➡️ [Check our Unboxed page](https://judge.me/unboxed?utm_source=help_desk&utm_medium=website) to discover newly launched features and improvements from Judge.me. See what’s new and start using the latest updates to grow your store.

---

Related Articles

- [Publishing and hiding reviews](https://judge.me/help/en/articles/8368681-publishing-and-hiding-reviews)
- [Sharing reviews as X posts (formerly Twitter)](https://judge.me/help/en/articles/8957011-sharing-reviews-as-x-posts-formerly-twitter)
- [Sharing reviews as Instagram posts](https://judge.me/help/en/articles/12674112-sharing-reviews-as-instagram-posts)
- [Automating customer engagement using Bizamply](https://judge.me/help/en/articles/12784005-automating-customer-engagement-using-bizamply)
