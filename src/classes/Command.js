class Command {
  constructor(client, { data }) {
    this.client = client;
    this.data = data;
  }
}

module.exports = Command;
