function digits(base, num){
  return num.toString(base).split("").map(Number);
};

function toString(trits){
  var str = "";
  for (var i=0, l=trits.length/4; i<l; ++i)
    str = str + String.fromCharCode(42 + parseInt(trits.slice(i*4, i*4+4).join(""),3));
  return str;
};

function pad(chr, len, str){
  while (str.length < len)
    str = chr + str;
  return str;
};

function bitsToHex(bits){
  var hex = "";
  for (var i=0, l=bits.length; i<l; i+=4){
    for (var j=0, s=0, r=1; j<4; r*=2, ++j)
      s += (bits[i+3-j]||0) * r;
    hex = hex + s.toString(16);
  };
  return hex;
};

function hash(bits, len){
  var tt = [1,2,0,0,0,1,1,2,2];
  var st = [];
  for (var i=0; i<128; ++i)
    st.push(i%3);
  var os = [];
  for (var k=0, l=st.length, il=bits.length; k<il+len; ++k){
    for (var j=0; j<32; ++j){
      if (k < il)
        st[0] = bits[k];
      for (var i=j%2; i<l; i+=2){
        var y = (i+1)%l;
        var a = st[i];
        var b = st[y];
        st[i] = tt[a*3+b];
        st[y] = tt[b*3+a];
        //st[i] = ((a*39 + b*13 + 19) ^ 12) % 3; // could replace the lookup table 
        //st[y] = ((b*39 + a*13 + 19) ^ 12) % 3;
      };
    };
    if (k >= il)
      os.push((st[0] + st[1]*3 + st[2]*9 + st[3]*27) % 2);
  };
  return os;
};

function stringToBits(str){
  var bits = [];
  for (var i=0, l=str.length; i<l; ++i)
    [].push.apply(bits, pad("0", 8, str.charCodeAt(i).toString(2)).split("").map(Number));
  return bits;
};

function hashString(str, len){
  return bitsToHex(hash(stringToBits(str), len));
};

for (var i=0; i<256; ++i)
  console.log(i,
    bitsToHex(digits(2, i)),
    bitsToHex(hash(digits(2, i), 256)));
