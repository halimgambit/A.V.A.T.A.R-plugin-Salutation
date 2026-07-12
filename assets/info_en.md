# Greeting

The **Greeting** plugin allows A.V.A.T.A.R to send greetings to a person or a group.

It automatically selects the appropriate greeting according to the time of day (good morning or good evening) and can also use the greeting explicitly requested by the user.

## Features

- Say hello, good morning or good evening to someone.
- Greet a group or everyone.
- Automatically choose between "good morning" and "good evening".
- Use the configured first name when no recipient is specified.
- Fully compatible with A.V.A.T.A.R language packs.

## Examples

- Hello John
- Good evening Mary
- Hi Paul
- Say hello to Sophie
- Say good evening to everyone
- Hi to my colleagues
- Hello

## Configuration

The plugin uses the following setting:

- **firstName**: first name used when no recipient is specified.

Example:

```json
{
  "modules": {
    "Salutation": {
      "firstName": "John"
    }
  }
}
```

## Notes

If no recipient is provided, A.V.A.T.A.R greets the configured user by name.