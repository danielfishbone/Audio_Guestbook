var SERVICE_PORT = 7474;
var UPDATER_SERVICE_PORT = 7477;
var SELECTED_UPDATE_VERSION = "";

var SERVICE_URL_BASE;

function notifyFileUploaded() {
  new Toast({ title: "Configuration updated", text : "Audio file updated", theme: "light", autohide: true, interval: 3000 });
}

function notifyFileDeleted() {
  new Toast({ title: "File deleted", text : "Audio file deleted from device", theme: "light", autohide: true, interval: 3000 });
}

function updateAudioSource(audio_element_name, audio_source_element_name, type_name) {
  var audio = document.getElementById(audio_element_name);
  if (audio == null) 
    return;

  var req = SERVICE_URL_BASE +"/getconfigvalue?type=" + type_name + "_file_name";
  $.get(req, function(result) {
    var audio_source = document.getElementById(audio_source_element_name);
    
    audio_source.type = getAudioContentTypeByExtension(getFileExtension(result));
    audio_source.src = SERVICE_URL_BASE + "/getaudiofile?type=" + type_name;
    audio.load();
  });
}

function updateAudioSources() {
  updateAudioSource("ringtone_audio", "ringtone_audio_source", "ringtone");
  updateAudioSource("greeting_audio", "greeting_audio_source", "greeting");
  updateAudioSource("beep_audio", "beep_audio_source", "beep");
  updateAudioSource("warning_audio", "warning_audio_source", "warning");
  updateAudioSource("end_audio", "end_audio_source", "end");
  updateAudioSource("speaker_audio", "speaker_audio_source", "speaker");
}

function fileNamePrefixFocusOut(input) {

  var url = "/update_config_value/";
  var data = {
  'config_param': 'filename_prefix',
  'value': input.value
   };
  $.ajax({
    type: "POST",
    url: url,
    headers: {
      "X-CSRFToken": getCookie("csrftoken")  // retrieve the CSRF token from a cookie
    },
    data: data,
    success: function(result) {
      new Toast({ title: "Value updated", text : "File name prefix updated" + result, theme: 'success', autohide: true, interval: 3000 });
    },
    error: function(xhr, status, error) {
      new Toast({ title: "Error", text : "Failed to update Field: " + xhr.responseText, theme: 'danger', autohide: true, interval: 3000 });
    }
  });


}


function recordLengthFocusOut(input) {
  var url = "/update_config_value/";
  var data = {
  'config_param': 'recording_length',
  'value': input.value
   };
  $.ajax({
    type: "POST",
    url: url,
    headers: {
      "X-CSRFToken": getCookie("csrftoken")  // retrieve the CSRF token from a cookie
    },
    data: data,
    success: function(result) {
      new Toast({ title: "Value updated", text : "Record length updated", theme: 'success', autohide: true, interval: 3000 });
    },
    error: function(xhr, status, error) {
      new Toast({ title: "Error", text : "Failed to update value: " + xhr.responseText, theme: 'danger', autohide: true, interval: 3000 });
    }
  });
  
}

// function to retrieve the value of a cookie by name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
}



function warningMessageLengthFocusOut(input) {

  var url = "/update_config_value/";
  var data = {
  'config_param': 'warning_message_length',
  'value': input.value
   };
  $.ajax({
    type: "POST",
    url: url,
    headers: {
      "X-CSRFToken": getCookie("csrftoken")  // retrieve the CSRF token from a cookie
    },
    data: data,
    success: function(result) {
      new Toast({ title: "Value updated", text : "warning message length updated", theme: 'success', autohide: true, interval: 3000 });
    },
    error: function(xhr, status, error) {
      new Toast({ title: "Error", text : "Failed to update value: " + xhr.responseText, theme: 'danger', autohide: true, interval: 3000 });
    }
  });
  
}

function speakerRingtonePlayPeriodFocusOut(input) {

  var url = "/update_config_value/";
  var data = {
  'config_param': 'speaker_ringtone_play_period',
  'value': input.value
   };
  $.ajax({
    type: "POST",
    url: url,
    headers: {
      "X-CSRFToken": getCookie("csrftoken")  // retrieve the CSRF token from a cookie
    },
    data: data,
    success: function(result) {
      new Toast({ title: "Value updated", text : "warning message length updated", theme: 'success', autohide: true, interval: 3000 });
    },
    error: function(xhr, status, error) {
      new Toast({ title: "Error", text : "Failed to update value: " + xhr.responseText, theme: 'danger', autohide: true, interval: 3000 });
    }
  });
  
}
// function externalToneTimeFocusOut(input) {
//   var url = "/update_config_value/";
//   var data = {
//   'config_param': 'external_tone_time',
//   'value': input.value
//    };
//   $.ajax({
//     type: "POST",
//     url: url,
//     headers: {
//       "X-CSRFToken": getCookie("csrftoken")  // retrieve the CSRF token from a cookie
//     },
//     data: data,
//     success: function(result) {
//       new Toast({ title: "Value updated", text : "speaker ringtone play period updated", theme: 'success', autohide: true, interval: 3000 });
//     },
//     error: function(xhr, status, error) {
//       new Toast({ title: "Error", text : "Failed to update value: " + xhr.responseText, theme: 'danger', autohide: true, interval: 3000 });
//     }
//   });
// }

function speakerEnabledClick(input) {

  var url = "/update_config_value/";
  var data = {
  'config_param': 'enable_external_speaker_flag',
  'value': (input.checked == true ? true : false)
   };
  $.ajax({
    type: "POST",
    url: url,
    headers: {
      "X-CSRFToken": getCookie("csrftoken")  // retrieve the CSRF token from a cookie
    },
    data: data,
    success: function(result) {
      new Toast({ title: "Value updated", text : "speaker ringtone play period updated", theme: 'success', autohide: true, interval: 3000 });
    },
    error: function(xhr, status, error) {
      new Toast({ title: "Error", text : "Failed to update value: " + xhr.responseText, theme: 'danger', autohide: true, interval: 3000 });
    }
  });

  // url= SERVICE_URL_BASE +'/setconfigvalue?type=speaker_enabled&value=' + (input.checked == true ? "1" : "0");
  // $.get(url, function(result) {
  //   new Toast({ title: "Value updated", text : "Speaker enabled updated", theme: "light", autohide: true, interval: 3000 });
  // });
}

// function getSerialShort() {
//   url= SERVICE_URL_BASE +'/serial?length=short';
//   $.get(url, function(result) {
//     var serial_link = document.getElementById("serial_link");

//     if (serial_link != null) {
//       serial_link.innerHTML = result;
//     }
//   });

// }

function getUpdateMessageHeader() {
  var html = "<br><b><font color='ff0000'>WARNING!</font></b><br>";
  html += "Do not power off device during update process will be completely finished!";
  html += "<br><br>";
  return html;
}

function startFirmwareUpdate() {
  var start_fw_update = document.getElementById("start_fw_update");
    if (start_fw_update != null) {
      start_fw_update.style.display = "none";
  }

  var current_fw_info = document.getElementById("current_fw_info");

  if (current_fw_info != null) {
    current_fw_info.innerHTML = getUpdateMessageHeader();
    current_fw_info.innerHTML += "Downloading update file version " + SELECTED_UPDATE_VERSION + " from server...";

    url = UPDATER_SERVICE_URL_BASE + '/download_update?version=' + SELECTED_UPDATE_VERSION;
    $.get(url, function(result) {
      var current_fw_info = document.getElementById("current_fw_info");
      if (result.result != 0) {
        current_fw_info.innerHTML += "<b>FAILED</b><br><br><b>Cannot download update from server, update failed!</b>";
        return;
      }

      current_fw_info.innerHTML += "<b>OK</b><br>";
      current_fw_info.innerHTML += "<b><font color='ff0000'>Installing firmware update...</font></b>";

      url = UPDATER_SERVICE_URL_BASE + '/install_update?version=' + SELECTED_UPDATE_VERSION;
      
      $.get(url, function(result) {
      });

      setTimeout(function(){
        window.location.replace("/");
      }, 55000) 
    });
  }
}


function getUpdaterCurrentVersion() {
  url = UPDATER_SERVICE_URL_BASE + '/query_updates';
  $.get(url, function(result) {
    var updates_link = document.getElementById("updates_link");

    if (updates_link != null) {
      var message = "fw.ver " + result.version;

      if (result.has_updates)
        message += "<br><font color='ff0000'>Update is available</font>";

      updates_link.innerHTML = message;
    }

    var current_fw_info = document.getElementById("current_fw_info");
    if (current_fw_info != null) {
      var html = "<b>Current version:</b> " + result.version + "<br>";
      html += "<b>System architecture:</b> " + result.arch + "<br>";
      html += "<b>Device OS:</b> " + result.os + "<br>";

      if (result.has_updates) {
        html += "<br>";
        html += "<b>New version available:</b>  " + result.update_to_version + "<br>";
        html += "<b>Description:</b>  " + result.updates[0].description + "<br>";
        html += "<br><b><font color='ff0000'>WARNING!</font></b><br>";
        html += "Please check power cable connected before start firmware update. Do not power off device during update process will be completely finished!";
    
        SELECTED_UPDATE_VERSION = result.update_to_version;

        var start_fw_update = document.getElementById("start_fw_update");
        if (start_fw_update != null) {
          start_fw_update.style.display = "block";

          $("#start_fw_update").on('click', [], function(e){
            e.preventDefault();
            startFirmwareUpdate();
          });
        }

      } else {
        html += "<br><br><b>Your device is updated! Enjoy!</b>";
      }

      current_fw_info.innerHTML = html;

    }

  });

}


function addAudioFile(id, fileName, deleteLink, downloadLink, contentType) {
  var mainElement = document.getElementById("main");
  if (mainElement == null) 
    return;

  var element_template = "<div class=\"audio-panel\" id=\"file_" + id + "\">" +
              "<div class=\"container\">" +
                "<h2>" + fileName + "</h2>" +
                "<div class=\"audio\">" +
                  "<a href=\"" + downloadLink + "\" class=\"download\"><i class=\"icon-arrow-down\"></i></a>" +
                  "<audio controls>" +
                    "<source src=\"" + downloadLink + "\" type=\"" + contentType + "\" />" +
                    "Your browser does not support the audio element." +
                  "</audio>" +

                  "<a href=\"" + "\" class=\"close\" id=\"delete_" + id + "\"><i class=\"icon-cross\"></i></a>" +
                "</div>" +
              "</div>" +
            "</div>";

  mainElement.insertAdjacentHTML('beforeend', element_template);

  $("#delete_" + id).on('click', [id,deleteLink], function(e){
    e.preventDefault();

    id = e.data[0];
    deleteLink = e.data[1];
    $.get(deleteLink, id, function(result) {
      var element = document.getElementById("file_" + id);
      if (element != null)
        element.remove();

      notifyFileDeleted();
    });
  });

}

function getFileExtension(filename) {
  return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}

function getAudioContentTypeByExtension(ext) {
  var contentType = "audio/*";
      if (ext == "mp3")
        contentType = "audio/mpeg";
      if (ext == "mp4")
        contentType = "audio/mp4";
      if (ext == "ogg")
        contentType = "audio/ogg";
      if (ext == "aif")
        contentType = "audio/x-aiff";
      if (ext == "aiff")
        contentType = "audio/x-aiff";
      if (ext == "wav")
        contentType = "audio/vnd.wav";
      if (ext == "vorbis")
        contentType = "audio/vorbis";
      if (ext == "snd")
        contentType = "audio/basic";
      if (ext == "au")
        contentType = "audio/basic";
      if (ext == "flac")
        contentType = "audio/flac";
  return contentType;
}


$(function(){
  baseHostname = window.location.hostname;
  baseUrl = window.location.origin;

  if (baseHostname == "") {
    SERVICE_URL_BASE = "http://127.0.0.1:" + SERVICE_PORT;
    UPDATER_SERVICE_URL_BASE = "http://127.0.0.1:" + UPDATER_SERVICE_PORT;
  } else {
    SERVICE_URL_BASE = "http://" + baseHostname + ":" + SERVICE_PORT;
    UPDATER_SERVICE_URL_BASE = "http://" + baseHostname + ":" + UPDATER_SERVICE_PORT;
  }

  $("#upload_ringtone").on('click', function(e){
        e.preventDefault();
        $("#upload_ringtone_input").trigger('click');

        setTimeout(function() { 
          updateAudioSources();
          notifyFileUploaded();
        }, 5000);
  });

  $("#upload_greeting").on('click', function(e){
        e.preventDefault();
        $("#upload_greeting_input").trigger('click');
        setTimeout(function() { 
          updateAudioSources();
          notifyFileUploaded();
        }, 5000);
  });
  $("#upload_background").on('click', function(e){
    e.preventDefault();
    $("#upload_background_input").trigger('click');
    setTimeout(function() { 
      updateAudioSources();
      notifyFileUploaded();
    }, 5000);
});




  $("#upload_beep").on('click', function(e){
        e.preventDefault();
        $("#upload_beep_input").trigger('click');
        setTimeout(function() { 
          updateAudioSources();
          notifyFileUploaded();
        }, 5000);
  });

  $("#upload_warning").on('click', function(e){
        e.preventDefault();
        $("#upload_warning_input").trigger('click');
        setTimeout(function() { 
          updateAudioSources();
          notifyFileUploaded();
        }, 5000);
  });

  $("#upload_end").on('click', function(e){
        e.preventDefault();
        $("#upload_end_input").trigger('click');
        setTimeout(function() { 
          updateAudioSources();
          notifyFileUploaded();
        }, 5000);
  });

  $("#upload_speaker").on('click', function(e){
        e.preventDefault();
        $("#upload_speaker_input").trigger('click');
        setTimeout(function() { 
          updateAudioSources();
          notifyFileUploaded();
        }, 5000);
  });

  $("#upload_devicekey").on('click', function(e){
        e.preventDefault();
        $("#upload_devicekey_input").trigger('click');
/*        setTimeout(function() { 
          notifyDeviceKeyUploaded();
          //window.location.reload();		  
        }, 4000);*/
  });
  
  $("#upload_devicekey_input").change(function() { 
    $("#upload_devicekey_action").submit();
          notifyDeviceKeyUploaded();
          window.location.reload();		  
  });

  $("#delete_all").on('click', function(e){
    e.preventDefault();

    var answer = window.confirm("Really delete all messages?");
    if (answer) {
      $.get(SERVICE_URL_BASE + '/record/deleteall?confirm=YES', function(result) {
        notifyFileDeleted();

        setTimeout(function() { 
          window.location.reload();
        }, 3000);
      });
    } else {
      // User cancelled delete
    }
  });


getSerialShort();
getUpdaterCurrentVersion();

  updateAudioSources();


$.get(SERVICE_URL_BASE +'/getconfigvalue?type=recording_length', function(result) {
    var obj = document.getElementById("record_length");
    if (obj != null)
      obj.value = result;
});

$.get(SERVICE_URL_BASE +'/getconfigvalue?type=file_name_prefix', function(result) {
    var obj = document.getElementById("file_name_prefix");
    if (obj != null)
      obj.value = result;
});

$.get(SERVICE_URL_BASE + '/getconfigvalue?type=warning_length', function(result) {
    var obj = document.getElementById("warning_message_length");
    if (obj != null)
      obj.value = result;
});

$.get(SERVICE_URL_BASE + '/getconfigvalue?type=speaker_play_period_ms', function(result) {
    var obj = document.getElementById("external_tone");
    if (obj != null)
      obj.value = result;
});

$.get(SERVICE_URL_BASE + '/getconfigvalue?type=speaker_enabled', function(result) {
    var obj = document.getElementById("speaker_enabled_checkbox");
    if (obj != null)
      obj.checked = result == "1" ? true : false;
});

$.get(SERVICE_URL_BASE + '/querylicense?type=vreq', function(result) {
    var obj = document.getElementById("serial_number");
    if (obj != null)
      obj.value = result;	
});


$.get(SERVICE_URL_BASE + '/querylicense', function(result) {
	var obj = document.getElementById("serial_number");
	var isUploadLicensePage = false;
	if (obj != null) {
		isUploadLicensePage = true;
	}
	
	if (result == "1" && isUploadLicensePage) {
      window.location.href = './index.html';
	}
	
	if (result == "0" && !isUploadLicensePage) {
	  window.location.href = './uploadlicense.html';
	}
});

var upload_devicekey_action = document.getElementById("upload_devicekey_action");
if (upload_devicekey_action != null) {
  upload_devicekey_action.action = SERVICE_URL_BASE + "/uploadlicensekey";
}

var upload_speaker_action = document.getElementById("upload_speaker_action");
if (upload_speaker_action != null) {
  upload_speaker_action.action = SERVICE_URL_BASE + "/uploadaudio?type=speaker";
}

var upload_ringtone_action = document.getElementById("upload_ringtone_action");
if (upload_ringtone_action != null) {
  upload_ringtone_action.action = SERVICE_URL_BASE + "/uploadaudio?type=ringtone";
}

var upload_background_action = document.getElementById("upload_background_action");
if (upload_background_action != null) {
  upload_background_action.action = SERVICE_URL_BASE + "/uploadaudio?type=greeting";
}
var upload_greeting_action = document.getElementById("upload_greeting_action");
if (upload_greeting_action != null) {
  upload_greeting_action.action = SERVICE_URL_BASE + "/uploadaudio?type=greeting";
}

var upload_beep_action = document.getElementById("upload_beep_action");
if (upload_beep_action != null) {
  upload_beep_action.action = SERVICE_URL_BASE + "/uploadaudio?type=beep";
}

var upload_warning_action = document.getElementById("upload_warning_action");
if (upload_warning_action != null) {
  upload_warning_action.action = SERVICE_URL_BASE + "/uploadaudio?type=warning"; 
}

var upload_end_action = document.getElementById("upload_end_action");
if (upload_end_action != null) {
  upload_end_action.action = SERVICE_URL_BASE + "/uploadaudio?type=end"; 
}

var download_link_element = document.getElementById("download_all_link");
if (download_link_element != null) {
  download_link_element.href = SERVICE_URL_BASE + "/downloadall";
}


const r_sort = (a, b, field, asc) => {
    let reverse = asc ? 1 : -1;
    if (a[field] > b[field]) {
        return 1 * reverse;
    }
    else if (b[field] > a[field]) {
        return -1 * reverse;
    }
    else {
        return 0;
    } }


var mainElement = document.getElementById("main");
if (mainElement != null) {

  $.get(SERVICE_URL_BASE +'/records/list', function(result) {
    result.records = result.records.sort((a,b) => r_sort(a,b,"name",true));
    for(var i=0; i<result.records.length; i++) {
      var record = result.records[i];
      var id = record.id;
      var name = record.name;

      var downloadLink = SERVICE_URL_BASE + "/record/" + id;
      var deleteLink = SERVICE_URL_BASE + "/record/delete/" + id;

      var ext = getFileExtension(name);
      var contentType = getAudioContentTypeByExtension(ext);
      addAudioFile(id, name, deleteLink, downloadLink, contentType);
    }
  });

}


});
