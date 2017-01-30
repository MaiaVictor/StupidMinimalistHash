#include <stdio.h>

void hash(int* bits, int bitsLen, int* out, int outLen){
  const int tt[9] = {1,2,0,0,0,1,1,2,2};
  int st[128], i, k, j, x, y, a, b;     // state st holds 128 trits
  for (i=0; i<128; ++i)                 // initial state setup
    st[i] = i%3;                        //
  for (k=0; k < bitsLen + outLen; ++k){ // for each input and output bit
    for (j=0; j<32; ++j){               // 32 times for each input and output bit 
      if (k < bitsLen)                  // if processing an input bit..
        st[0] = bits[k];                // enter that input bit in state
      for (i=j%2; i<128; i+=2){         // for each pair of trits in state
        x = (i+0)%128;                  // index of first trit
        y = (i+1)%128;                  // index of second trit
        a = st[x];                      // get these current trits values              
        b = st[y];                      //
        st[x] = tt[a*3+b];              // update these trits per table tt
        st[y] = tt[b*3+a];              //
      };                                //
    };                                  //
    if (k >= bitsLen)                   // building an output bit
      out[k-bitsLen] = (st[0] + st[1] + st[2] + st[3]) % 2;
  };
}

void printHex(int* bits, int bitsLen){
  int i;
  for (i=0; i<bitsLen/4; ++i)
    printf("%x", bits[i*4+0]*8+bits[i*4+1]*4+bits[i*4+2]*2+bits[i*4+3]);
}

void toBits(int n, int* bits, int bitsLen){
  int i;
  for (i=0; i<bitsLen; ++i)
    bits[bitsLen-i-1] = (n >> i) & 1;
}

int main(){
  const int bitsLen = 16;
  int bits[bitsLen];

  const int outLen = 256;
  int out[outLen];

  int i;
  for (i=0; i<256; ++i){
    toBits(i, bits, bitsLen);
    hash(bits, bitsLen, out, outLen);
    printHex(bits, bitsLen);
    printf(": ");
    printHex(out, outLen);
    printf("\n");
  };
}
