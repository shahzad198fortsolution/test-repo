   // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
      function onDeviceReady() {
                // find all contacts with 'Bob' in any name field
                var options = new ContactFindOptions();
                options.filter = "Bob";
                var fields = ["displayName", "name"];
                navigator.contacts.find(fields, onSuccess, onError, options);
            }

            // onSuccess: Get a snapshot of the current contacts

            function onSuccess(contacts) {
                for (var i = 0; i < contacts.length; i++) {
                    console.log("Display Name = " + contacts[i].displayName);
                }
            }

            // onError: Failed to get the contacts

            function onError(contactError) {
                alert('onError!');
            }