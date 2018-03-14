
var modele = function()
{
  this.elements = new Array();

  /*
   * Add a element
   */
  this.add = function(element, value)
  {
      this.elements[element] = value;
  }

  /*
   * Replace all element
   */
  this.replace = function(html)
  {

    gconsole.log(this.elements);

    for( var element in this.elements )
    {
          html = html.replace(element, this.elements[element]);
    }

    return html;
  }
};

module.exports = modele;
