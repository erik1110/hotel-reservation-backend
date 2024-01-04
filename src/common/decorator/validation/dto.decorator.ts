import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

export function IsNotBeforeToday(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isNotBeforeToday',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const inputDate = new Date(value);
          inputDate.setHours(0, 0, 0, 0);
          return inputDate >= today;
        },
      },
    });
  };
}


export function IsBefore(property: string, validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
      registerDecorator({
        name: 'isBefore',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments): boolean {
            const relatedValue = args.object[property];
            if (value instanceof Date && relatedValue instanceof Date) {
              return value > relatedValue;
            }
            return false;
          },
        },
      });
    };
  }