create table if not exists public.sim_report_slides (
  report_id text not null,
  slide_id smallint not null check (slide_id between 1 and 3),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (report_id, slide_id)
);

alter table public.sim_report_slides enable row level security;

-- Для внутреннего рабочего инструмента без авторизации.
-- При публичном размещении лучше заменить эти политики на доступ только для авторизованных пользователей.
drop policy if exists "sim_report_slides_select" on public.sim_report_slides;
create policy "sim_report_slides_select"
on public.sim_report_slides for select
to anon, authenticated
using (true);

drop policy if exists "sim_report_slides_insert" on public.sim_report_slides;
create policy "sim_report_slides_insert"
on public.sim_report_slides for insert
to anon, authenticated
with check (true);

drop policy if exists "sim_report_slides_update" on public.sim_report_slides;
create policy "sim_report_slides_update"
on public.sim_report_slides for update
to anon, authenticated
using (true)
with check (true);
