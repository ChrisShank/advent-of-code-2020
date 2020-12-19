function parseRatings(input) {
  const ratings = input
    .split('\n')
    .map(rating => parseInt(rating))
    .sort((a, b) => a - b)


  ratings.unshift(0)

  ratings.push(ratings[ratings.length - 1] + 3)

  return ratings
}

function joltsOfChain(input) {
  const ratings = parseRatings(input)

  let oneJoltDifference = 0
  let threeJoltDifference = 0

  ratings.forEach((rating, i) => {
    if (i !== 0 || i !== ratings.length - 1) {
      const difference = ratings[i + 1] - rating
      if (difference === 1) {
        oneJoltDifference += 1;
      } else if (difference === 3) {
        threeJoltDifference += 1
      }
    }
  });

  return oneJoltDifference * threeJoltDifference
}

function countPermutations(ratings) {
  if (ratings.length < 2) {
    return ratings.length
  }
  
  const [rating, ...nextRatings] = ratings 
  
  const possibleRatings = nextRatings.filter(r => r - rating <= 3)

  return possibleRatings.reduce((permutations, r, i) => {
    console.log(rating, ' possible: ', r)
    if (i === possibleRatings.length - 1) {
      console.log(r, nextRatings)
      return  permutations + countPermutations(nextRatings)
    }
    
    for (let j = i + 1; j < possibleRatings.length; j += 1) {
      console.log(r, [r, ...nextRatings.slice(j)])
      permutations += countPermutations([r, ...nextRatings.slice(j)])
    }
    console.log(r, '----')
    return permutations
  }, 0)
}

function adapterPermutations(input) {
  const ratings = parseRatings(input)

  return countPermutations(ratings)
}

const adapterRatings = `145
3
157
75
84
141
40
20
60
48
15
4
2
21
129
113
54
28
69
42
34
1
155
63
151
8
139
135
33
81
70
132
150
112
102
59
154
53
144
149
116
13
41
156
85
22
165
51
14
125
52
64
16
134
110
71
107
124
164
160
10
25
66
74
161
111
122
166
140
87
126
123
146
35
91
106
133
26
77
19
86
105
39
99
76
58
31
96
78
88
168
119
27
45
9
92
138
38
97
32
7
98
167
95
55
65`
  

console.log(joltsOfChain(adapterRatings))
console.log(adapterPermutations(`16
10
15
5
1
11
7
19
6
12
4`))