class ComplaintDTO {
  constructor(complaint) {
    this._id = complaint._id;
    this.category = complaint.category;
    this.title = complaint.title;
    this.description = complaint.description;
    this.photo = complaint.photoPath;
    this.user = complaint.user;
    this.userAdmin = complaint.userAdmin;
    this.status = complaint.status;
  }
}

module.exports = ComplaintDTO;
