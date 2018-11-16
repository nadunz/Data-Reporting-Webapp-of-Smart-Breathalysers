
function hbsHelpers(hbs) {
  // increment the value
  hbs.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
  });
  // check equality
  hbs.registerHelper('equal', function(lvalue, rvalue, options) {
      if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
      if( lvalue!=rvalue ) {
          return options.inverse(this);
      } else {
          return options.fn(this);
      }
  });
  // check greatest value
  hbs.registerHelper('gt', function(lvalue, rvalue, options) {
      if (arguments.length < 3)
          throw new Error("Handlebars Helper equal needs 2 parameters");
      if( lvalue >= rvalue ) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
  });
  // More helpers...
}

module.exports = hbsHelpers;
