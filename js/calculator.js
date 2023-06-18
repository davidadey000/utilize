
      // to show number on the calc display
      function insert(num) {
        $(".calc-display").val($(".calc-display").val() + num);
      }

      // to evaluate the expression
      function eql() {
        $(".calc-display").val(eval($(".calc-display").val()));
      }

      // to clear the calc display
      function c() {
        $(".calc-display").val("");
      }

      // to delete the last number from the calc display
      function del() {
        value = $(".calc-display").val();
        $(".calc-display").val(value.substring(0, value.length - 1));
      }

     