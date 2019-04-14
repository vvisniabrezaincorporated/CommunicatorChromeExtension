export class User {

    constructor(name, emailaddress, password, privkey, publicKey, revocationCertificate) {
      this.name = name;
      this.emailaddress = emailaddress;
      this.password= password;
      this.privkey = privkey;
      this.publicKey = publicKey;
      this.revocationCertificate = revocationCertificate;
    }
  }