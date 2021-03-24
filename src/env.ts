const envs = {
  test: 'test',
  prod: 'prod',
}

export type NodeEnv = 'test' | 'prod'

export default envs[(process.env.NODE_ENV || 'test') as NodeEnv]
