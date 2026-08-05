import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Coffee,
} from "lucide-react";

export type AccountOrder = {
  id: string;
  status: string;
  payment_status: string;
  total: number | string;
  pickup_time: string | null;
  created_at: string;
  order_items:
    | {
        id: string;
        product_name: string;
        quantity: number;
        line_total: number | string;
      }[]
    | null;
};

type OrderCardProps = {
  order: AccountOrder;
};

function formatPrice(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(value));
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

function shortOrderId(id: string) {
  return id.split("-")[0]?.toUpperCase() ?? id;
}

export function OrderCard({ order }: OrderCardProps) {
  const items = order.order_items ?? [];

  return (
    <article className="account-order-card">
      <div className="account-order-card-header">
        <div>
          <p className="account-order-number">
            Order #{shortOrderId(order.id)}
          </p>

          <div className="account-order-meta">
            <span>
              <CalendarDays size={15} />
              {formatDate(order.created_at)}
            </span>

            {order.pickup_time ? (
              <span>
                <Clock3 size={15} />
                Pickup {formatTime(order.pickup_time)} ET
              </span>
            ) : null}
          </div>
        </div>

        <span
          className={`order-status-pill order-status-${order.status}`}
        >
          {formatStatus(order.status)}
        </span>
      </div>

      <div className="account-order-items">
        {items.map((item) => (
          <div
            className="account-order-item"
            key={item.id}
          >
            <div>
              <Coffee size={16} />

              <span>
                {item.quantity} × {item.product_name}
              </span>
            </div>

            <strong>
              {formatPrice(item.line_total)}
            </strong>
          </div>
        ))}
      </div>

      <div className="account-order-card-footer">
        <div>
          <span>Total</span>
          <strong>{formatPrice(order.total)}</strong>
        </div>

        <Link href={`/order/${order.id}`}>
          View order
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
