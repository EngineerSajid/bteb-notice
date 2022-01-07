import { For } from 'solid-js'

import NoticeItem from './NoticeItem'

import fetchNotices from '../utils/fetchNotices'
import onScrollBottom from '../utils/onScrollBottom'

export default function NoticeSection() {
  const { notices, nextChunk } = fetchNotices()

  onScrollBottom(() => {
    nextChunk()
  })

  return (
    <section className="mt-12 flex-grow flex">
      <div
        aria-label="Notices"
        className="flex flex-col max-w-2xl w-full mx-auto py-4 bg-white dark:bg-gray-800"
      >
        <Show
          when={notices().length > 0}
          fallback={<span className="m-auto">Loading...</span>}
        >
          <For each={notices()}>
            {([date, title, link]) => (
              <NoticeItem title={title} date={date} link={link} />
            )}
          </For>
        </Show>
      </div>
    </section>
  )
}
