export type OccurrenceDTO = {
  occurrence: {
    id: string
    latitude: number
    longitude: number
    problem_id: number
    user_id: string
    created_at: string
    status: string
  },
  comments: [{
    occurrence_id: string
    user_id: string
    comment: string
    created_at: string
    photo: null
    user: {
      name: string
    }
  }],
}