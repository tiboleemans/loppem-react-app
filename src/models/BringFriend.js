class BringFriend {
  constructor(parentName, parentEmail, friendName) {
    this.parentName = parentName;
    this.parentEmail = parentEmail;
    this.friendName = friendName;
  }

  static fromApi(bringFriendData) {
    return new BringFriend(bringFriendData.parentName, bringFriendData.parentEmail, bringFriendData.friendName);
  }
}

export default BringFriend;