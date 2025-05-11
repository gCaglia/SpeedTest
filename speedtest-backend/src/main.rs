use axum::body::Body;
use axum::extract::{DefaultBodyLimit, Query};
use axum::http::header;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::response::Response;
use axum::routing::{get, post};
use axum::{Json, Router};
use bytes::Bytes;
use chrono::Utc;
use serde::{Serialize, Deserialize};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

const REQUEST_BODY_LIMIT: usize = 100 * 1024 * 1024;

#[derive(Serialize)]
struct Pong {
    message: String,
    timestamp: u64,
}

#[derive(Deserialize)]
struct DownloadParams {
    size: usize
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
    let cors_layer: CorsLayer = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers([header::CONTENT_TYPE]);
    let app: Router = Router::new()
        .route("/ping", get(ping_handler))
        .route("/download", get(download_speed_handler))
        .route("/upload", post(upload_speed_handler))
        .layer(cors_layer)
        .layer(DefaultBodyLimit::max(REQUEST_BODY_LIMIT));
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

async fn download_speed_handler(Query(params): Query<DownloadParams>) -> Response<Body> {

    let body: Bytes = Bytes::from(vec![0u8; params.size]);

    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_LENGTH, params.size.to_string())
        .header(header::CONTENT_TYPE, "application/octet-stream")
        .body(Body::from(body))
        .expect("Failed to build response!")
}

async fn upload_speed_handler(body: Bytes) -> impl IntoResponse {
    let _ = body.len();
    StatusCode::OK
}
