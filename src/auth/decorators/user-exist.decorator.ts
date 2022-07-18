import { registerDecorator, ValidationOptions } from 'class-validator';
import { UserExistsRule } from '../validators/user-exist-rule.validator';

/* istanbul ignore file */
export function UserAlreadyExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserAlreadyExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
}
