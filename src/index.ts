import { desc, run, task } from 'https://deno.land/x/drake@v1.2.3/mod.ts'

desc('Minimal Drake task')
task('hello', [], function () {
  console.log('Hello World!')
})

run()
