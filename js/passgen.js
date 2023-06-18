
      function generatePassword() {
        // get/check parameters to generate password
        const length = document.getElementById("password-length").value;
        const includeLowercase = $("#include-lowercase").prop("checked");
        const includeUppercase = $("#include-uppercase").prop("checked");
        const includeNumbers = $("#include-numbers").prop("checked");
        const includeSymbols = $("#include-symbols").prop("checked");

        // picking character set to use based on parameters
        let charset = "";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
          // select a character from the set by index after picking index at random and add it to the password
          password += charset.charAt(
            Math.floor(Math.random() * charset.length)
          );
        }

        // Set the generated password in localStorage
        localStorage.setItem("password", password);
        return password;
      }

      function closeNavUtil() {
        $(".side-nav").removeClass("responsive-nav");
      }

      $(document).ready(function () {
        $("#nav-placeholder").load("nav.html");
        $("#copyright-div").load("statement.html");

        // display result
        $("#generate-password").click(function () {
          var password = generatePassword();
          $("#password").val(password);
        });

        // copy to generated password to clipboard
        $("#copy-password").click(function () {
          var password = $("#password").val();
          if (password) {
            $("#password").select();
            document.execCommand("copy");
            alert("Password copied to clipboard!");
          }
        });

        // Retrieve the password from localStorage when the page loads - persistence
        const password = localStorage.getItem("password");
        if (password) {
          document.getElementById("password").value = password;
        }

        // prevent the password length input field from exceeding 20
        $(".pass-length").on("input", function () {
          if ($(this).val() > 20) {
            value = $(this).val();
            $(this).val(value.substring(0, value.length - 1));
          }
        });
      });
    