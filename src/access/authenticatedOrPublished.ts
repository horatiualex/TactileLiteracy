export const authenticatedOrPublished = ({ req: { user } }: { req: { user: any } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
