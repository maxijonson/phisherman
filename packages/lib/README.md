# Phisherman Library

A library that can be used to programmatically interact with the Phisherman API.

## Installation

Install Phisherman using npm:

```bash
npm install @maxijonson/phisherman
```

or yarn:

```bash
yarn add @maxijonson/phisherman
```

## Usage

Create a new instance of Phisherman by giving it a configuration object. The configuration object contains information about the phishing endpoints and the data to send to them. Once the instance is created, call the `run` method to start the spamming process.

```typescript
import Phisherman from "@maxijonson/phisherman";

const phisherman = new Phisherman({
    /* config */
});
await phisherman.run();
```

Internally, the `Phisherman` class is just a wrapper around the `Config` and `Runner` classes. You can use them directly if you want to have more control over the spamming process. The following code is basically what the `Phisherman` class does:

```typescript
import { Config, Runner } from "@maxijonson/phisherman";

const config = new Config({
    /* config */
});
const runner = new Runner(config);
await runner.run();
```

## Configuration

The configuration object is passed to the `Phisherman` class when creating a new instance. It contains information about the phishing endpoints and the data to send to them. The configuration object has the following structure:

```json
{
    // (Required) The base URL of the phishing website
    "baseUrl": "http://phisher.com/",

    // (Required) The endpoints to spam. Each endpoint will be sent a request using the same identity.
    "endpoints": [
        {
            // (Required) The path of the endpoint, relative to the base URL. Can be a string or an array of strings. A string array is the same as duplicating the endpoint, but with a different path. The same identity will be used for all paths.
            "path": "deposit/bank",

            // (Required) The HTTP method to use when sending the request. One of "POST", "PUT" or "PATCH".
            "method": "POST",

            // (Required) The data to send to the endpoint.
            "data": {
                // (Required) The type of data to send. One of "form-data", "x-www-form-urlencoded" or "json".
                "type": "x-www-form-urlencoded",

                // (Required) The data to send. Both keys and values can use templates to inject identity data.
                "body": {
                    "username": "{{username}}",
                    "card": "{{cc-type}} - {{cc}}",
                    "step": "1"
                }
            },

            // (Optional) The headers to send with the request. Both keys and values can use templates to inject identity data.
            "headers": {
                "User-Agent": "{{ua-mobile}}"
            }
        },
        {
            "path": ["deposit/bank/b", "deposit/bank/c"],
            "method": "PUT",
            "data": {
                "type": "json",
                "body": {
                    "full_name": "{{first-name}} {{last-name}}",
                    "nonce{{counter}}": "{{counter-identity}}"
                }
            },
            "headers": {
                "User-Agent": "{{ua}}"
            }
        }
    ],

    // (Optional) The number of times to spam each endpoint. Defaults to 100.
    "iterations": 100,

    // (Optional) The number of concurrent identities that will be used to spam the endpoints. Defaults to 10.
    "concurrency": 10
}
```

## Templates

In the `data.body` and `headers` fields of the `endpoints` configuration, you can use templates to inject identity data.

### Available templates

| Template            | Description                                                                                     | Example                                                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 3pin                | A random pin of 3 numbers                                                                       | 420                                                                                                                  |
| 4pin                | A random pin of 4 numbers                                                                       | 1337                                                                                                                 |
| birthday            | An ISO birth date (YYYY-MM-DD)                                                                  | 2022-07-27                                                                                                           |
| birthday-slash      | An ISO birth date, with slashes instead of dashes (YYYY/MM/DD)                                  | 2022/07/27                                                                                                           |
| birthdayus          | An en-US formatted date (MM/DD/YYYY)                                                            | 07/27/2022                                                                                                           |
| birthdayus-dash     | An en-US formatted date, with dashes instead of slashes (MM-DD-YYYY)                            | 07-27-2022                                                                                                           |
| c                   | Random lowercase character                                                                      | t                                                                                                                    |
| C                   | Random uppercase character                                                                      | B                                                                                                                    |
| cc                  | Credit card number with spaces (with a valid type according to `cc-type`)                       | 6304 0385 1107 3827                                                                                                  |
| cc-mastercard       | Mastercard credit card. Useful when the cc-type is using a number instead of a string.          | 6304 0385 1107 3827                                                                                                  |
| cc-mastercard-short | Mastercard credit card without the spaces                                                       | 6304038511073827                                                                                                     |
| cc-short            | Credit card number without spaces                                                               | 6304038511073827                                                                                                     |
| cc-type             | Either `Mastercard` or `Visa`                                                                   | Mastercard                                                                                                           |
| cc-type-lower       | Either `mastercard` or `visa`                                                                   | mastercard                                                                                                           |
| cc-visa             | Visa credit card. Useful when the cc-type is using a number instead of a string.                | 4511 0666 3319 7384                                                                                                  |
| cc-visa-short       | Visa credit card without the spaces.                                                            | 4511066633197384                                                                                                     |
| cvv                 | Credit card CVV number                                                                          | 777                                                                                                                  |
| d                   | Random digit (0-9)                                                                              | 7                                                                                                                    |
| day-of-birth        | The day of the birthday                                                                         | 27                                                                                                                   |
| email               | An email address                                                                                | john.doe@gmail.com                                                                                                   |
| exp-month           | Credit card's month of expiry                                                                   | 07                                                                                                                   |
| exp-year            | Credit card's year of expiry                                                                    | 2022                                                                                                                 |
| i                   | A value that is incremented each time it is used, starting at 1 (**never** resets)              | 1                                                                                                                    |
| j                   | A value that is incremented each time it is used, starting at 1 (resets between **identities**) | 1                                                                                                                    |
| k                   | A value that is incremented each time it is used, starting at 1 (resets between **endpoints**)  | 1                                                                                                                    |
| month-of-birth      | The month of the birthday                                                                       | 07                                                                                                                   |
| mother-maiden-name  | The maiden name of the identity's mother                                                        | Ida                                                                                                                  |
| password            | The password associated with the username                                                       | My5tr0ngPa55w0rd1337                                                                                                 |
| phone               | A phone number, unformatted                                                                     | 5141234567                                                                                                           |
| phone-format        | A phone number, formated                                                                        | (514) 123-4567                                                                                                       |
| s                   | Random special character                                                                        | $                                                                                                                    |
| sin                 | A Canadian Social Insurance Number (XXX-XXX-XXX)                                                | 123-456-789                                                                                                          |
| sin-short           | A Canadian Social Insurance Number with no dashes (XXXXXXXXX)                                   | 123456789                                                                                                            |
| ssn                 | A US Social Security Number (XXX-XX-XXXX)                                                       | 123-45-6789                                                                                                          |
| ssn-short           | A US Social Security Number with no dashes (XXXXXXXXX)                                          | 123456789                                                                                                            |
| ua                  | User-Agent (generated by [user-agents](https://www.npmjs.com/package/user-agents))              | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36  |
| ua-desktop          | Desktop User-Agent (generated by [user-agents](https://www.npmjs.com/package/user-agents))      | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36      |
| ua-mobile           | Mobile User-Agent (generated by [user-agents](https://www.npmjs.com/package/user-agents))       | Mozilla/5.0 (Linux; Android 9; Vibe P1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36 |
| username            | A username for logging on to a bank website                                                     | doejohn123                                                                                                           |
| year-of-birth       | The year of the birthday                                                                        | 2022                                                                                                                 |

### Custom templates

You can define your own templates using the `Template.registerTemplate` method. This method receives an `Identity` and an `Endpoint` and must return a string (other types are not currently supported).

```typescript
import Phisherman, {
    Template,
    Identity,
    Endpoint,
} from "@maxijonson/phisherman";

const getInfo = (identity: Identity, endpoint: Endpoint) => {
    return `${identity.firstName} ${identity.lastName} ${endpoint.url}`;
};

Template.registerTemplate("info", getInfo);

const phisherman = new Phisherman({
    /* ... */
    body: {
        info: "{{info}}",
    },
    /* ... */
});
await phisherman.run();
```
