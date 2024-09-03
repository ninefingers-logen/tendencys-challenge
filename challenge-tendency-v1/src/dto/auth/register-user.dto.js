/**
 * DTO para registrar un usuario
 * Un DTO generalmente es usado transportar datos entre diferentes capas de la aplicación y manipularlos
 * En este caso en concreto no es tan necesario por los pocos datos que estamos manejando.
 * 
 * !!!!! SOLO LO DEJO POR MOTIVOS DIDACTICOS, en los demas servicios no son necesarios !!!!
 */

export class RegisterUserDto {
  constructor(name, phone, img_profile) {
    this.name = name;
    this.phone = phone;
    this.img_profile = img_profile;
  }

  static create(object) {
    return new RegisterUserDto(object.name, object.phone, object.img_profile);
  }
}