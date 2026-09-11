---
title: "Prerequisites"
source: "https://developers.google.com/my-business/content/prereqs"
final_url: "https://developers.google.com/my-business/content/prereqs"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:13:18Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "58668ba4a1bf736b018c08319b047ab31c4e7f08630cd4a4249a4e1169fc824a"
---

# Prerequisites Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- You need a Google Account and familiarity with Business Profile before starting.
- Create a project in the Google API Console and an Organization account to access the API.
- Request access to the Business Profile API via the GBP API contact form and await approval.
- Enable the Business Profile APIs for your project after receiving approval.

To successfully create your first client application, you must complete the following
prerequisites:

1. [Get a Google Account](#get-account).
2. [Try out Business Profile](#try-out).
3. [Create a project in the Google Cloud Console](#create-project).
4. [Create an Organization account](#create-organization-account).
5. [Request access to the API](#request-access).

## Get a Google Account

You need a
[Google Account](https://www.google.com/accounts/NewAccount) in order to create a project in the
Google API Console. If you already have an account, you're all set.

## Try out Business Profile

This API documentation assumes that you've used Business Profile before, and that you're
familiar with web programming concepts and web data formats.

If you haven't used Business Profile, try out the
[user interface](https://www.google.com/business/) before you start to code.

## Create a project in the Google API Console

Before you can send requests to the Business Profile APIs, you need to use the
Google API Console to create a project, and then request access to the Business Profile APIs for that
project. To create a new project, go to the
[Google Cloud Console](https://console.developers.google.com/project).
Click **Create project**, enter a name, and click **Create**.

## Create an Organization account

To create an Organization account, go to the
[GBP help center](https://support.google.com/business/answer/7663063).

## Request access to the APIs

In order to get access to GBP APIs, we require all applicants:

- Manage a Google Business Profile that is verified and active for 60+ days. This GBP can be the applicant's own office or headquarters or it could belong to one of the clients they manage.
- Have a website representing the business listed on the GBP.

For a smooth and timely review of your application, we recommend that the Google Business Profile is fully complete and kept up-to-date with the current business information, including the business's official website.

Once you have met the requirements stated earlier, you can request API access by following these steps:

1. Go to the [Google Cloud Console](https://console.developers.google.com/project) and select the project you plan to use with the Business Profile APIs.
2. Find your Project Number in the Project info card on your project's Dashboard. You will need to provide this number in your application.
3. When you are ready, submit your request using our [GBP API contact form](https://support.google.com/business/contact/api_default). Select 'Application for Basic API Access' from the drop-down menu and provide all requested information.
4. Make sure that you are using an email address that is listed as an owner/manager on your business's GBP.
5. A follow-up email will be sent to you after your request has been reviewed.

**Note on Checking Approval Status:** You can also check if your project has been approved by viewing the quotas for the Business Profile APIs in the Google Cloud Console.

- If your quota is 0 QPM (Queries Per Minute), your project has not yet been approved.
- If your quota is set to 300 QPM, your project is approved.

If your application is approved, see [Basic setup](/my-business/content/basic-setup) to enable the Business Profile APIs for your project. If your application is rejected, make sure you have met the requirements stated earlier before re-applying.
