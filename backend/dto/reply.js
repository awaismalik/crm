class ReplyDTO {
  constructor(reply) {
    this.id = reply._id;
    this.reply = reply.reply;
    this.createdAt = reply.createdAt;
    this.name = reply.user.name;
    this.userEmail = reply.user.email;
  }
}

module.exports = ReplyDTO;
