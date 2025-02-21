import { NextRequest, NextResponse } from "next/server";

/**
 * @name GET, @name POST, @name PUT, @name DELETE, @name PATCH
 * @param req
 * @description NextRequest
 * @returns 요청 그대로를 전달 (요청 별로 특정 동작이나 필터작업 필요 시, 추가)
 */
export async function GET(req: NextRequest) {
  return NextResponse.next();
}

export async function POST(req: NextRequest) {
  return NextResponse.next();
}

export async function PUT(req: NextRequest) {
  return NextResponse.next();
}

export async function DELETE(req: NextRequest) {
  return NextResponse.next();
}

export async function PATCH(req: NextRequest) {
  return NextResponse.next();
}
