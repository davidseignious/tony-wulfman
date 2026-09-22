import React, { useEffect, useMemo, useRef, useState } from 'react';

// Portfolio images are Tony Wulfman's work from his official Old Town Tatu portfolio.
// Do not add style tags until each tattoo has been visually verified.
const WORK = [
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482651/tony-work-01.jpg',
    title: 'Clock and rose memorial',
    tags: ['black-grey', 'realism', 'floral'],
  },
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482660/tony-work-02.jpg',
    title: 'Eye and clock composition',
    tags: ['black-grey', 'realism'],
  },
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482667/tony-work-03.jpg',
    title: 'Fine-line symbol',
    tags: ['fine-line'],
  },
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482674/tony-work-04.jpg',
    title: 'Animal-eye realism',
    tags: ['realism', 'portrait'],
  },
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482680/tony-work-05.jpg',
    title: 'Fine-line figurative piece',
    tags: ['fine-line', 'black-grey'],
  },
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482687/tony-work-06.jpg',
    title: 'Wolf and mountain scene',
    tags: ['black-grey', 'nature'],
  },
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482694/tony-work-07.jpg',
    title: 'Chicago memorial composition',
    tags: ['black-grey', 'realism', 'portrait'],
  },
  {
    src: 'https://res.cloudinary.com/hxnwueko/image/upload/q_auto:best,f_auto/v1788482702/tony-work-08.jpg',
    title: 'Color character portrait',
    tags: ['color', 'realism', 'portrait'],
  },
];

const TAG_LABELS = {
  'fine-line': 'Fine line',
  realism: 'Realism',
  portrait: 'Portrait',
  floral: 'Floral',
  nature: 'Nature',
  'black-grey': 'Black & grey',
  color: 'Color',
};

const FILTERS = [
  { id: 'all', label: 'All work' },
  { id: 'realism', label: 'Realism' },
  { id: 'fine-line', label: 'Fine line' },
  { id: 'black-grey', label: 'Black & grey' },
  { id: 'nature', label: 'Nature & floral', matches: ['nature', 'floral'] },
  { id: 'color', label: 'Color' },
];

function WorkTile({ item, index, onOpen, onAvailability }) {
  const [state, setState] = useState('checking');

  if (state === 'failed') return null;

  return (
    <figure className="portfolio-tile mb-4 break-inside-avoid overflow-hidden border border-stone/15 bg-char">
      <button
        type="button"
        onClick={onOpen}
        disabled={state !== 'ready'}
        aria-label={`Open tattoo ${index + 1} by Tony Wulfman`}
        className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-ink disabled:cursor-default"
      >
        <span className="block min-h-56 overflow-hidden bg-char">
          <img
            src={item.src}
            alt={`${item.title}, tattoo by Tony Wulfman at Old Town Tatu in Chicago`}
            loading="lazy"
            decoding="async"
            onLoad={(event) => {
              const image = event.currentTarget;
              const longEdge = Math.max(image.naturalWidth, image.naturalHeight);
              if (longEdge < 700) {
                setState('failed');
                onAvailability(item.src, false);
                return;
              }
              setState('ready');
              onAvailability(item.src, true);
            }}
            onError={() => {
              setState('failed');
              onAvailability(item.src, false);
            }}
            className={`h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.012] ${state === 'checking' ? 'opacity-0' : 'opacity-100'}`}
          />
        </span>
        {state === 'ready' && (
          <figcaption className="flex items-end justify-between gap-4 border-t border-stone/15 px-4 py-3 text-left">
            <span>
              <span className="block font-display text-lg leading-tight text-bone">{item.title}</span>
              <span className="mt-1 block text-xs text-stone">{item.tags.map((tag) => TAG_LABELS[tag] || tag).join(' · ')}</span>
            </span>
            <span className="shrink-0 text-xs text-brass">View</span>
          </figcaption>
        )}
      </button>
    </figure>
  );
}

function Lightbox({ items, index, onIndex, onClose }) {
  const closeRef = useRef(null);
  const restoreFocus = useRef(null);
  const item = items[index];

  useEffect(() => {
    restoreFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      restoreFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const keydown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onIndex(index === 0 ? items.length - 1 : index - 1);
      if (event.key === 'ArrowRight') onIndex(index === items.length - 1 ? 0 : index + 1);
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [index, items.length, onClose, onIndex]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/95 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-dialog-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-stone/20 pb-4">
          <div>
            <p id="gallery-dialog-title" className="font-display text-2xl text-bone">{item.title}</p>
            <p className="text-xs text-stone">{item.tags.map((tag) => TAG_LABELS[tag] || tag).join(' · ')} · {index + 1} of {items.length}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-11 w-11 items-center justify-center border border-stone/30 text-2xl text-bone hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            ×
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="flex h-full items-center justify-center px-11 sm:px-16">
            <img
              src={item.src}
              alt={`${item.title}, tattoo by Tony Wulfman at Old Town Tatu in Chicago`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onIndex(index === 0 ? items.length - 1 : index - 1)}
                aria-label="Previous tattoo"
                className="absolute left-0 top-1/2 flex h-12 w-10 -translate-y-1/2 items-center justify-center border border-stone/30 bg-ink text-3xl text-bone hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => onIndex(index === items.length - 1 ? 0 : index + 1)}
                aria-label="Next tattoo"
                className="absolute right-0 top-1/2 flex h-12 w-10 -translate-y-1/2 items-center justify-center border border-stone/30 bg-ink text-3xl text-bone hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [availability, setAvailability] = useState({});
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredWork = useMemo(() => {
    if (activeFilter === 'all') return WORK;
    const filter = FILTERS.find((option) => option.id === activeFilter);
    const matches = filter?.matches || [activeFilter];
    return WORK.filter((item) => item.tags.some((tag) => matches.includes(tag)));
  }, [activeFilter]);

  const availableItems = useMemo(
    () => filteredWork.filter((item) => availability[item.src] === true),
    [availability, filteredWork],
  );

  const setItemAvailability = (src, value) => {
    setAvailability((current) => (current[src] === value ? current : { ...current, [src]: value }));
  };

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20 sm:py-24" aria-labelledby="work-title">
      <div className="mb-8 border-b border-stone/20 pb-6 sm:flex sm:items-end sm:justify-between sm:gap-8">
        <div>
          <h2 id="work-title" className="font-display text-4xl font-light text-bone sm:text-5xl">Selected work</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-stone">
            Explore Tony’s work by style, then open any piece for a closer look at the detail.
          </p>
        </div>
        <a
          href="https://www.instagram.com/tonywulfman.art/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-stone hover:text-brass focus:outline-none focus-visible:text-brass sm:mt-0"
        >
          @tonywulfman.art
        </a>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter portfolio by style">
        {FILTERS.map((filter) => {
          const selected = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setActiveFilter(filter.id);
                setLightboxIndex(null);
              }}
              className={`border px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
                selected
                  ? 'border-brass bg-brass text-ink'
                  : 'border-stone/25 text-stone hover:border-brass hover:text-bone'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filteredWork.map((item) => (
          <WorkTile
            key={item.src}
            item={item}
            index={WORK.findIndex((work) => work.src === item.src)}
            onAvailability={setItemAvailability}
            onOpen={() => {
              const availableIndex = availableItems.findIndex((candidate) => candidate.src === item.src);
              if (availableIndex >= 0) setLightboxIndex(availableIndex);
            }}
          />
        ))}
      </div>

      {lightboxIndex !== null && availableItems[lightboxIndex] && (
        <Lightbox
          items={availableItems}
          index={lightboxIndex}
          onIndex={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
