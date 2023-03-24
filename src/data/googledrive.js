
// This function saves a JSON object to a folder in Google Drive.
function saveObjectToDrive(object, folderId) {
    // Set the access token.
    gapi.auth.authorize({
      'client_id': 'YOUR_CLIENT_ID',
      'scope': 'https://www.googleapis.com/auth/drive.file',
      'immediate': true
    }, function() {
      var accessToken = gapi.auth.getToken().access_token;
  
      // Create the metadata for the file.
      var fileMetadata = {
        'name': 'object.json',
        'parents': [folderId]
      };
  
      // Create the data for the file.
      var fileData = new Blob([JSON.stringify(object)], {type: 'application/json'});
  
      // Create the request to upload the file.
      var uploadRequest = new XMLHttpRequest();
      uploadRequest.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
      uploadRequest.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      uploadRequest.setRequestHeader('Content-Type', 'multipart/related; boundary=boundary');
  
      // Create the multipart body for the request.
      var body = '--boundary\r\n' +
                 'Content-Type: application/json\r\n\r\n' +
                 JSON.stringify(fileMetadata) + '\r\n' +
                 '--boundary\r\n' +
                 'Content-Type: application/json\r\n\r\n' +
                 JSON.stringify(object) + '\r\n' +
                 '--boundary--\r\n';
  
      // Send the request.
      uploadRequest.send(body);
    });
  }