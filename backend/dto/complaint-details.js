class DetailsComplaintDTO {
  constructor(complaint) {
    this._id = complaint._id;
    this.category = complaint.category;
    this.title = complaint.title;
    this.description = complaint.description;
    this.photo = complaint.photoPath;
    this.userName = complaint.user.name;
    this.userEmail = complaint.user.email;
    this.createdAt = complaint.user.createdAt;
  }
}

module.exports = DetailsComplaintDTO;
