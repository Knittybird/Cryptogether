interface SimpleNumProps {
  value: number,
  prefix?: string
}

function SimpleNum(props: SimpleNumProps) {

  //Code from https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
  function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue:number = 0;
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum !== 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        var shortValueString = shortValue+''
        if (shortValue % 1 !== 0)  shortValueString = shortValue.toFixed(1)+'';
        newValue = shortValueString+' '+suffixes[suffixNum];
    }
    return newValue;
  }

  const { value, prefix } = props
  return (
    <span className="simpleNum">
      {prefix ? prefix : ''}{abbreviateNumber(value)}
    </span>
  )
}

export default SimpleNum