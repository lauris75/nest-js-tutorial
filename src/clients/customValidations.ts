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

export function checkPersonalCode(gender: string, birthDate: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'checkPersonalCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [gender, birthDate],
      options: validationOptions,
      validator: {
        validate(personalCode: any, args: ValidationArguments) {
          const [clientGender, clientBirthDate] = args.constraints;
          const gender: string = (args.object as any)[clientGender];
          const birthDate: string = (args.object as any)[clientBirthDate];
          const century: number = parseInt(birthDate.substr(6, 2));
          let firstDigit: string;
          const day: string = birthDate.substr(0, 2);
          const month: string = birthDate.substr(3, 2);
          const year: string = birthDate.substr(8, 2);

          if(gender === 'male'){
            switch(century){
              case 18:
                firstDigit = '1';
                break;
              case 19:
                firstDigit = '3';
                break;
              case 20:
                firstDigit = '5';
                break;
            }
          }
          else{
            switch(century){
              case 18:
                firstDigit = '2';
                break;
              case 19:
                firstDigit = '4';
                break;
              case 20:
                firstDigit = '6';
                break
            }
          }
          const seqNum: string = personalCode.toString().substr(7, 3);
          let personalString: string = firstDigit + year + month + day + seqNum;
          let finalDigit: number = (Number(personalString[0]) * 1 + Number(personalString[1]) * 2 + Number(personalString[2]) * 3 +
          Number(personalString[3]) * 4 + Number(personalString[4]) * 5 + Number(personalString[5]) * 6 +
          Number(personalString[6]) * 7 + Number(personalString[7]) * 8 + Number(personalString[8]) * 9 +
          Number(personalString[9]) * 1) % 11;
          if(finalDigit === 10){
            finalDigit = (Number(personalString[3]) * 1 + Number(personalString[4]) * 2 + Number(personalString[5]) * 3 +
            Number(personalString[6]) * 4 + Number(personalString[7]) * 5 + Number(personalString[8]) * 6 +
            Number(personalString[9]) * 7 + Number(personalString[1]) * 8 + Number(personalString[2]) * 9 +
            Number(personalString[3]) * 1) % 11;
            if(finalDigit === 10) { finalDigit = 0};
          }
          personalString = personalString + finalDigit.toString();

          return (typeof personalCode === 'number' && personalCode === Number(personalString));
        },
      },
    });
  };
}