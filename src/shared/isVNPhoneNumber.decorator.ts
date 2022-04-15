import {
  buildMessage,
  ValidateBy,
  ValidationOptions,
} from 'class-validator';

export function isVNPhoneNumber(value: string): boolean {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(value);
}

export function IsVNPhoneNumber(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isVNPhoneNumber',
      validator: {
        validate: (value, args): boolean => isVNPhoneNumber(value),
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + '$property not match Vietnam phone number',
          validationOptions
        ),
      },
    },
    validationOptions
  );
}
