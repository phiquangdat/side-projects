// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand;
}

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate(){
      const randomIdx =  Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while(this.dna[randomIdx] === newBase){
        newBase = returnRandBase();
      }
      this.dna[randomIdx] = newBase;
    },
    compareDNA(pAequor){
      let count = 0;
      this.dna.forEach((element, index) => {
        if(element === pAequor.dna[index]){
          count++;
        }
      });
      return count / pAequor.dna.length;
    },
    willLikelySurvive(){
      let surviveRate = this.dna.filter(base => base === 'C' || base === 'G');
      return (surviveRate.length / this.dna.length) >= 0.6;
  }}
}

let sample = [];
let i = 0;
while (sample.length < 30) {
  let temp = pAequorFactory(i, mockUpStrand());
  if (temp.willLikelySurvive() == true) {
    sample.push(temp);
    i += 1;
  } 
}
console.log(sample);



