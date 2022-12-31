# Phisherman

## What is Phisherman?

Phisherman is a tool for scamming the scammers! It spams phishing endpoints with fake credentials, polluting their databases with fake data.

## How does it work?

Phisherman uses a config file that can be generated with the init command:

```bash
phisherman init
```

The example config file was created from an actual phishing's website. That being said, each phishing website is different and you'll have to modify the config file to fit your needs. To do so, you can view the requests made by your browser when you submit the form. You'll need to find the endpoint that is called when you submit the form and the data fields that are sent. You can then add the endpoint to the config file. ⚠ **Make sure you do this in a controlled environment! The website you're visiting is to be treated as malware and could steal valuable information during your analysis. Obviously, do not use your real credentials!** ⚠

This config contains the endpoints to spam along with the data fields to send. Data fields can be static or randomly generated using templates. Once your config is ready, use the run command to start spamming:

```bash
# 100 iterations using the default phisherman.config.json in the current working directory
phisherman run

# Or to specify a config file
phisherman run --config path/to/phisherman.config.json

# Or to specify a number of iterations
phisherman run --iterations 100
```

When generating random data, Phisherman tries to generate data that is as realistic as possible. For example, emails can have over 50 different patterns that mimics common email address patterns.

## Templates

Before looping through each endpoint, a new identity is generated with random data. Templates can then be used to inject the identity data into the data fields. Templates are are defined in the config file and can be used in the data fields. surround the template name with double curly braces to use it. For example, `{{email}}` will be replaced with a random email address. Behind the scenes, Phisherman _mostly_ makes use of the [Chance](https://www.npmjs.com/package/chance) library to generate random data.

As you'll notice, many templates relate to each other. For example, if `birthday` is set to `2022-07-27`, then `year-of-birth` will be `2022`. Phisherman provides many "full" templates (like `birthday`), but since scammers all have different ways of collecting data, you can go as granular as possible with sub-templates that keep their consistency with the full template (like `year-of-birth`). Internally, Phisherman identities have a predefined format (like a `Date` in the case of a birthday) and the templates are only ways to print that data in a specific format.

_Note: Templates only work in the `body` field of an endpoint's `data` field_

### Available templates

| Template            | Description                                                                                     | Example              |
| ------------------- | ----------------------------------------------------------------------------------------------- | -------------------- |
| email               | An email address                                                                                | john.doe@gmail.com   |
| username            | A username for logging on to a bank website                                                     | doejohn123           |
| password            | The password associated with the username                                                       | My5tr0ngPa55w0rd1337 |
| 4pin                | A random pin of 4 numbers                                                                       | 1337                 |
| 3pin                | A random pin of 3 numbers                                                                       | 420                  |
| phone               | A phone number, unformatted                                                                     | 5141234567           |
| phone-format        | A phone number, formated                                                                        | (514) 123-4567       |
| birthday            | An ISO birth date (YYYY-MM-DD)                                                                  | 2022-07-27           |
| birthday-slash      | An ISO birth date, with slashes instead of dashes (YYYY/MM/DD)                                  | 2022/07/27           |
| birthdayus          | An en-US formatted date (MM/DD/YYYY)                                                            | 07/27/2022           |
| birthdayus-dash     | An en-US formatted date, with dashes instead of slashes (MM-DD-YYYY)                            | 07-27-2022           |
| day-of-birth        | The day of the birthday                                                                         | 27                   |
| month-of-birth      | The month of the birthday                                                                       | 07                   |
| year-of-birth       | The year of the birthday                                                                        | 2022                 |
| mother-maiden-name  | The maiden name of the identity's mother                                                        | Ida                  |
| ssn                 | A US Social Security Number (XXX-XX-XXXX)                                                       | 123-45-6789          |
| ssn-short           | A US Social Security Number with no dashes (XXXXXXXXX)                                          | 123456789            |
| sin                 | A Canadian Social Insurance Number (XXX-XXX-XXX)                                                | 123-456-789          |
| sin-short           | A Canadian Social Insurance Number with no dashes (XXXXXXXXX)                                   | 123456789            |
| cc                  | Credit card number with spaces (with a valid type according to `cc-type`)                       | 6304 0385 1107 3827  |
| cc-short            | Credit card number without spaces                                                               | 6304038511073827     |
| cc-type             | Either `Mastercard` or `Visa`                                                                   | Mastercard           |
| cc-type-lower       | Either `mastercard` or `visa`                                                                   | mastercard           |
| cc-visa             | Visa credit card. Useful when the cc-type is using a number instead of a string.                | 4511 0666 3319 7384  |
| cc-visa-short       | Visa credit card without the spaces.                                                            | 4511066633197384     |
| cc-mastercard       | Mastercard credit card. Useful when the cc-type is using a number instead of a string.          | 6304 0385 1107 3827  |
| cc-mastercard-short | Mastercard credit card without the spaces                                                       | 6304038511073827     |
| cvv                 | Credit card CVV number                                                                          | 777                  |
| exp-month           | Credit card's month of expiry                                                                   | 07                   |
| exp-year            | Credit card's year of expiry                                                                    | 2022                 |
| c                   | Random lowercase character                                                                      | t                    |
| C                   | Random uppercase character                                                                      | B                    |
| d                   | Random digit (0-9)                                                                              | 7                    |
| s                   | Random special character                                                                        | $                    |
| i                   | A value that is incremented each time it is used, starting at 1 (**never** resets)              | 1                    |
| j                   | A value that is incremented each time it is used, starting at 1 (resets between **identities**) | 1                    |
| k                   | A value that is incremented each time it is used, starting at 1 (resets between **endpoints**)  | 1                    |
