window.ajax = (param) => {
  const settings = {
    "url": param.url,
    "method": "GET",
    "timeout": 0,
    dataType: 'json',
    ContentType: 'application/json;charset=utf-8',
    headers: {
      Accept: "application/json; charset=utf-8"
    },
  };

  $.ajax(settings).done(function (response) {
    param.success && param.success(response);
  });
}