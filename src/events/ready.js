module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute() {
    await this.client.logger.log("EVENT", `${this.client.user.tag} is ready !`);
  }
};
