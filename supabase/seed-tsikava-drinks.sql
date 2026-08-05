-- TSIKAVA menu catalog
-- Paste this entire file into Supabase Dashboard → SQL Editor → New query, then Run.
-- It is safe to run more than once: products are updated by slug and options are only added when missing.

begin;

insert into categories (name, slug)
values
  ('Summer matcha', 'summer-matcha'),
  ('Signature latte', 'signature-latte'),
  ('Summer refresher', 'summer-refresher'),
  ('Sparkling refresher', 'sparkling-refresher'),
  ('Matcha', 'matcha'),
  ('Seasonal coffee', 'seasonal-coffee'),
  ('Classic coffee', 'classic-coffee')
on conflict (slug) do update set
  name = excluded.name;

with catalog (
  slug,
  name,
  description,
  base_price,
  category_name,
  artwork,
  is_featured
) as (
  values
    ('cornflower-cloud', 'Cornflower Cloud', 'Blueberry syrup, oat milk, vanilla matcha, and blueberry cold foam over ice.', 6.50, 'Summer matcha', 'cornflower', true),
    ('cherry-kava', 'Cherry Kava', 'Espresso, dark cherry, cocoa, and lightly sweet cream served over ice.', 6.25, 'Signature latte', 'cherry', true),
    ('honey-linen', 'Honey Linen', 'Wildflower honey, salted caramel, espresso, and silky milk.', 5.75, 'Signature latte', 'honey', true),
    ('forest-berry-refresher', 'Forest Berry Refresher', 'Blackberry, blueberry, blackcurrant, lemon, and sparkling water.', 5.95, 'Summer refresher', 'berry', true),
    ('kupalle-sunset', 'Kupalle Sunset', 'Strawberry, raspberry, hibiscus, and lemonade with a bright citrus finish.', 5.95, 'Summer refresher', 'kupalle', false),
    ('birch-morning', 'Birch Morning', 'Crisp apple, white peach, lemon, and sparkling birch water.', 5.75, 'Sparkling refresher', 'birch', false),
    ('strawberry-field', 'Strawberry Field', 'Strawberry purée, ceremonial matcha, and your choice of milk.', 6.75, 'Matcha', 'matcha', false),
    ('dark-forest-mocha', 'Dark Forest Mocha', 'Dark chocolate, espresso, cherry, and a small pinch of smoked salt.', 6.50, 'Seasonal coffee', 'mocha', false),
    ('daily-kava', 'Daily Kava', 'A straightforward espresso drink made exactly the way you like it.', 4.50, 'Classic coffee', 'classic', false)
)
insert into products (
  name,
  slug,
  description,
  base_price,
  category_id,
  artwork,
  is_featured,
  is_available
)
select
  catalog.name,
  catalog.slug,
  catalog.description,
  catalog.base_price,
  categories.id,
  catalog.artwork,
  catalog.is_featured,
  true
from catalog
join categories on categories.name = catalog.category_name
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  base_price = excluded.base_price,
  category_id = excluded.category_id,
  artwork = excluded.artwork,
  is_featured = excluded.is_featured,
  is_available = excluded.is_available;

-- A simple required size selection for every drink.
insert into option_groups (
  product_id,
  name,
  selection_type,
  is_required,
  min_selections,
  max_selections,
  display_order
)
select
  products.id,
  'Size',
  'single',
  true,
  1,
  1,
  1
from products
where products.slug in (
  'cornflower-cloud', 'cherry-kava', 'honey-linen',
  'forest-berry-refresher', 'kupalle-sunset', 'birch-morning',
  'strawberry-field', 'dark-forest-mocha', 'daily-kava'
)
and not exists (
  select 1
  from option_groups
  where option_groups.product_id = products.id
    and option_groups.name = 'Size'
);

with size_groups as (
  select option_groups.id
  from option_groups
  join products on products.id = option_groups.product_id
  where option_groups.name = 'Size'
    and products.slug in (
      'cornflower-cloud', 'cherry-kava', 'honey-linen',
      'forest-berry-refresher', 'kupalle-sunset', 'birch-morning',
      'strawberry-field', 'dark-forest-mocha', 'daily-kava'
    )
), sizes (name, additional_price, display_order) as (
  values
    ('Regular', 0.00, 1),
    ('Large', 0.75, 2)
)
insert into product_options (
  option_group_id,
  name,
  additional_price,
  display_order
)
select
  size_groups.id,
  sizes.name,
  sizes.additional_price,
  sizes.display_order
from size_groups
cross join sizes
where not exists (
  select 1
  from product_options
  where product_options.option_group_id = size_groups.id
    and product_options.name = sizes.name
);

-- Milk choices only for espresso and matcha drinks.
insert into option_groups (
  product_id,
  name,
  selection_type,
  is_required,
  min_selections,
  max_selections,
  display_order
)
select
  products.id,
  'Milk',
  'single',
  true,
  1,
  1,
  2
from products
where products.slug in (
  'cornflower-cloud', 'cherry-kava', 'honey-linen',
  'strawberry-field', 'dark-forest-mocha', 'daily-kava'
)
and not exists (
  select 1
  from option_groups
  where option_groups.product_id = products.id
    and option_groups.name = 'Milk'
);

with milk_groups as (
  select option_groups.id
  from option_groups
  join products on products.id = option_groups.product_id
  where option_groups.name = 'Milk'
    and products.slug in (
      'cornflower-cloud', 'cherry-kava', 'honey-linen',
      'strawberry-field', 'dark-forest-mocha', 'daily-kava'
    )
), milks (name, additional_price, display_order) as (
  values
    ('Whole milk', 0.00, 1),
    ('Oat milk', 0.75, 2),
    ('Almond milk', 0.75, 3)
)
insert into product_options (
  option_group_id,
  name,
  additional_price,
  display_order
)
select
  milk_groups.id,
  milks.name,
  milks.additional_price,
  milks.display_order
from milk_groups
cross join milks
where not exists (
  select 1
  from product_options
  where product_options.option_group_id = milk_groups.id
    and product_options.name = milks.name
);

commit;
