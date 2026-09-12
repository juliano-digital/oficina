const items = ['Diagnóstico eletrônico', 'Troca de óleo ATF', 'Reparo de câmbio', 'Manutenção preventiva', 'Câmbio CVT', 'Câmbio DSG']

function ServiceItems() {
	return <div className="flex shrink-0 items-center gap-8 pr-8">
		{items.map((item) => <span key={item} className="flex items-center gap-8 whitespace-nowrap font-display text-lg uppercase tracking-wide text-white">
			{item}<b className="text-black/50" aria-hidden="true">✦</b>
		</span>)}
	</div>
}

export function ServicesMarquee() {
	return <div className="overflow-hidden bg-signal py-4" aria-label="Serviços oferecidos" role="region">
		<div className="marquee-track flex w-max" tabIndex={0}>
			<ServiceItems />
			<div aria-hidden="true"><ServiceItems /></div>
		</div>
	</div>
}
