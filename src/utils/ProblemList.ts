const problemList = [
  {id: 1, title: 'Buraco na rua'},
  {id: 2, title: 'Falta de iluminação'},
  {id: 3, title: 'Queda de árvore'},
  {id: 4, title: 'Entupimento de esgoto'},
];

export function problemIdToTitle(id: number) {
  const problem = problemList.filter((item) => item.id === id)

  return problem[0] ? problem[0].title : 'Problema não implementado'
}