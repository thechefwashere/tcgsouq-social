---
title: "Accounts"
source: "https://developers.google.com/my-business/content/accounts"
final_url: "https://developers.google.com/my-business/content/accounts"
platform: "google-business-profile"
fetched_at: "2026-09-11T09:20:10Z"
last_checked_at: "2026-09-11T10:17:58Z"
previous_fetched_at: ""
http_status: "200"
format: "html-converted"
sha256: "2c9951519647c29367ab7ae3df6a9588775f40100b736300bc185aec14ad3abc"
---

# Accounts Stay organized with collections Save and categorize content based on your preferences.

## Page Summary

- The Business Profile APIs require a Google Account and offer tools for managing multiple accounts.
- There are four Business Profile account types: Personal, Organization (required for partners), Location Group, and User Group.
- Organization accounts are designed for agencies and partners, acting as containers for multiple listings and groups.
- Location Groups allow for managing and performing bulk tasks on multiple business locations.
- User Groups simplify account permission management by enabling shared access for multiple personal accounts.

Every individual that uses the Business Profile APIs is expected to have already created their own
[Google Account](https://myaccount.google.com/).

The [Google Identity Platform](/identity/choose-auth) and
[OpenID Connect](/identity/protocols/OpenIDConnect) are available to help you
[sign in to multiple accounts at once](https://support.google.com/accounts/answer/1721977),
and from different platforms. Your Google Account phone and email preferences help determine which
of your contact methods are available for PIN verification. For example, your account must have a
phone number configured for Google to initiate PIN verification when you use voice or SMS.

Merchants can have multiple Google Accounts and locations. To avoid duplicates, as well as
ownership and verification delays, best practice is for merchants to
[sign in to all of their accounts](https://support.google.com/accounts/answer/1721977).

Changes made through the Business Profile APIs appear immediately in your Business Profile
account.

## Business Profile account types

There are four account types used with the Business Profile APIs to manage users and locations.

### Personal account

A personal account is automatically available to you when you create a
[Google Account](https://support.google.com/accounts/answer/27441).
Personal accounts are linked to the Google Account of the business owner, or, optionally, to the
Google Account of an operations team member. Personal accounts can be
[owners and managers of listings](https://support.google.com/business/answer/9178945).

### Organization account

If a partner operations team or if a partner develops an application that assists the business
owner with management of the business, such as with responses to reviews, operation hours,
pricing, and menu updates, then it's best to create an
[organization account](https://support.google.com/business/answer/7663063).

Organization accounts act as containers for multiple listings and groups. An organization account
represents your
[agency](https://support.google.com/business/answer/9199701).
Your location group and user groups are saved in it, and all members of an organization have
access to them. Locations can be part of multiple organizations.

### Location group account

A
[location group](https://support.google.com/business/answer/7655842)
is used to manage a group of individual locations. You can use a location group to perform bulk
tasks to multiple locations. When you add personal accounts and user groups to a location group,
they inherit the location group's permissions.

Location group accounts enable sorting, access, and management of listings by partner-defined
categories, attributes, or roles.

### User group account

[User group](https://support.google.com/business/answer/7655731)
accounts enable management of account permissions that are common to multiple personal accounts.

You can add personal accounts to a user group. Then, you can grant the user group management
access to multiple location groups in the organization. In this manner, all personal accounts in
the user group can perform managerial actions on the locations under the location groups.
