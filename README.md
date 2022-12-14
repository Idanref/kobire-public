## Kobire Project

#### A Web App Built With ReactJS, Redux, NodeJS, MongoDB, ExpressJS.

**Live Site:** https://kobire.herokuapp.com/

**Screenshots:** https://github.com/Idanref/kobire-public/tree/main/Screenshots/

The application allows a user to purchase tickets for mobile photography workshops led by Kobi Refaeli (@kobire).
<br>
The application contains features such as:
* Email verification.
* Purchasing using PayBox/Bit (No external API was used)
* Purchasing in discount prices using coupons.
* Reading & writing reviews.
* And much more!

All managed by backend.

## Admin Interface

#### ! This page shows the public project, there is also an **“Admin Interface”** project that allows the admin to:
* Create a new workshop
* Edit workshop details (such as location, date, sold-out, price, participants, Bit/PayBox URL and more)
* Approve that a user has transferred the required payment (depending on the price & number of tickets) and add them to the workshop participants list.
* Remove specific user from workshop (if a user asks to cancel)
* Create a coupon
* Edit coupon details (such as coupon code, expiration date, use limit and discount percentage)

#### Link to Admin Interface Project: https://github.com/Idanref/kobire-admin-public

## Features & Limitations

### Workshops:
* If the workshop date has passed, the user will not be able to choose it.
* If the workshop is sold-out or doesn't have both Bit & PayBox URL - the user will see it but won't be able to choose it.
* After the confirmation email is sent to the user, they will have 3 attempts to insert the correct code.
* When a user is approved, they will receive an email with a receipt containing all the details regarding the transaction & the event.
* If workshop is limited by number of tickets, once the number of taken spots reaches this number, it will automatically toggle into soldout state.

### Coupons:
* The user will fail to apply coupon if:
  * Coupon code is incorrect
  * Use limit has reached 0 (maximum number of participants applied the coupon)
  * Expiration date has passed

### Comments:
* User can comment only if:
  * The user has attended at least one event
  * The user didn’t leave a review before with the same email
