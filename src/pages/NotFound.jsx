import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-6 py-32">
      <p className="font-mono text-[10px] tracking-[0.4em] text-bronze-300/70">ERROR 404</p>
      <h1 className="mt-4 font-display text-display-sm text-gradient-gold">这个音不存在</h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
        你访问的页面可能已经被移调、休止，或者从未被谱写。
      </p>
      <div className="mt-9">
        <Button to="/" variant="outline" size="lg">
          回到首页
        </Button>
      </div>
    </section>
  )
}
