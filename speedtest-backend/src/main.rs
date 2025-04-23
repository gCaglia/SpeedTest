use axum::response::IntoResponse;
use axum::response::Response;
use axum::routing::get;
use axum::{Json, Router};
use bytes::Bytes;
use chrono::Utc;
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

#[derive(Serialize)]
struct Pong {
    message: String,
    timestamp: u64,
}

impl Pong {
    fn new() -> Self {
        return Pong {
            message: "Pong".to_string(),
            timestamp: Utc::now().timestamp() as u64,
        };
    }
}

impl IntoResponse for Pong {
    fn into_response(self) -> Response {
        Json(self).into_response()
    }
}

#[tokio::main]
async fn main() {
    let app: Router = Router::new()
        .route("/ping", get(ping_handler))
        .route("/download", get(download_speed_handler))
        .layer(CorsLayer::new().allow_origin(Any));
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("Listening on {}...", addr);
    axum_server::bind(addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn ping_handler() -> Pong {
    return Pong::new();
}

async fn download_speed_handler() -> impl IntoResponse {
    let body: Bytes = Bytes::from(vec![0u8; 10 * 1024 * 1024]);
    return body;
}
