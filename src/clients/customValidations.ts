import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function passwordCheck(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'passwordCheck',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(psw: any, args: ValidationArguments) {
            let checkIfNumberExist = psw.match(/\d+/g);
            console.log(isNaN(Number(psw)));
            return (typeof psw === 'string' && psw.length > 7 && checkIfNumberExist != null && isNaN(Number(psw)));
        },
      },
    });
  };
}

export function genderCheck(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'genderCheck',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(gender: any, args: ValidationArguments) {
          return (typeof gender === 'string' && (gender === 'female' || gender === 'male'));
        },
      },
    });
  };
}

export function checkBirthDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'checkBirthDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(date: any, args: ValidationArguments) {
            const day: number = parseInt(date.substr(0, 2));
            const month: number = parseInt(date.substr(3, 2));
            const year: number = parseInt(date.substr(6, 4));
          return (typeof date === 'string' && day > 0 && day < 32 && month > 0 && month < 13 && year > 1900 && year < 2023);
        },
      },
    });
  };
}