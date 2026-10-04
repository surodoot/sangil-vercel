import { expect, test } from "@playwright/test";

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`homepage fits ${width}px without horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
    for (const id of [
      "about",
      "business",
      "equipment",
      "quality",
      "gallery",
      "contact",
      "location",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        )
        .toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

  test("repeated open/Escape and close return focus and unlock scrolling", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "메뉴 열기" });
    for (let index = 0; index < 3; index++) {
      await trigger.click();
      await expect(
        page.getByRole("dialog", { name: "전체 메뉴" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "메뉴 닫기" }),
      ).toBeFocused();
      await expect(page.locator("main")).toHaveAttribute("inert", "");
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(trigger).toBeFocused();
      await expect(page.locator("main")).not.toHaveAttribute("inert", "");
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
        "hidden",
      );
    }
    await trigger.click();
    await page.getByRole("button", { name: "메뉴 닫기" }).click();
    await expect(trigger).toBeFocused();
  });

  test("Tab and Shift+Tab stay inside the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page.keyboard.press("Shift+Tab");
    await expect(
      page
        .getByRole("dialog")
        .getByRole("link", { name: "견적 문의하기", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "메뉴 닫기" })).toBeFocused();
  });

  test("navigation closes, scrolls to its section, and preserves history", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "사업분야" })
      .click();
    await expect(page).toHaveURL(/#business$/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("#business")).toBeInViewport();
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "회사소개" })
      .click();
    await expect(page).toHaveURL(/#about$/);
    await page.goBack();
    await expect(page).toHaveURL(/#business$/);
    await page.goForward();
    await expect(page).toHaveURL(/#about$/);
  });

  test("desktop resize closes the mobile menu and restores background", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("short-height menu remains scrollable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 390 });
    await page.goto("/");
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    const link = page
      .getByRole("dialog")
      .getByRole("link", { name: "생산사례" });
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeInViewport();
    await link.click();
    await expect(page).toHaveURL(/#gallery$/);
  });

  test("privacy navigation reaches the homepage and has no sticky CTA", async ({
    page,
  }) => {
    await page.goto("/privacy");
    await expect(page.locator("[data-mobile-sticky-cta]")).toHaveCount(0);
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "사업분야" })
      .click();
    await expect(page).toHaveURL(/\/#business$/);
    await expect(page.locator("#business")).toBeInViewport();
  });
});

test.describe("local inquiry preview", () => {
  test.use({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });

  test("shows validation and never claims or sends a real submission", async ({
    page,
  }) => {
    let requests = 0;
    page.on("request", (request) => {
      if (request.url().includes("/api/inquiry")) requests++;
    });
    await page.goto("/#contact");
    await expect(
      page.getByText("온라인 문의 접수 준비 중", { exact: true }),
    ).toBeVisible();
    const submit = page.getByRole("button", { name: "입력 내용 확인하기" });
    await submit.click();
    await expect(page.locator("#companyName-error")).toBeVisible();
    await expect(page.locator("#companyName")).toBeFocused();
    await page.locator("#companyName").fill("테스트 기업");
    await page.locator("#contactName").fill("테스트 담당자");
    await page.locator("#phone").fill("010-0000-0000");
    await page.locator("#email").fill("qa@example.invalid");
    await page.locator("#productName").fill("테스트 부품");
    await page
      .locator("#message")
      .fill("로컬 동작 확인을 위한 테스트 입력입니다.");
    await submit.click();
    await expect(
      page.getByText("필수 입력 항목을 확인했습니다.", { exact: false }),
    ).toBeVisible();
    expect(requests).toBe(0);
    await expect(
      page.getByText("문의가 접수되었습니다", { exact: true }),
    ).toHaveCount(0);
    await page.locator("#email").fill("invalid");
    await submit.click();
    await expect(page.locator("#email-error")).toBeVisible();
    await expect(
      page.getByText("필수 입력 항목을 확인했습니다.", { exact: false }),
    ).toHaveCount(0);
  });

  test("CTA does not cover contact inputs and input font remains 16px", async ({
    page,
  }) => {
    await page.goto("/#contact");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-mobile-sticky-cta]")).toHaveCount(0);
    await page.locator("#companyName").focus();
    expect(
      await page
        .locator("#companyName")
        .evaluate((node) => getComputedStyle(node).fontSize),
    ).toBe("16px");
    await expect(page.locator("[data-mobile-sticky-cta]")).toHaveCount(0);
  });

  test("invalid and duplicate files remain local and can be removed", async ({
    page,
  }) => {
    await page.goto("/#contact");
    const file = {
      name: "invalid.exe",
      mimeType: "application/octet-stream",
      buffer: Buffer.from("test"),
    };
    await page.locator("#inquiry-files").setInputFiles(file);
    await expect(
      page.getByText("지원하지 않는 파일 형식입니다.", { exact: false }),
    ).toBeVisible();
    await page.getByRole("button", { name: "invalid.exe 선택 취소" }).click();
    await expect(page.getByText("invalid.exe", { exact: true })).toHaveCount(0);
    await page
      .locator("#inquiry-files")
      .setInputFiles({
        name: "drawing.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("test"),
      });
    await expect(
      page.getByText("선택됨, 미전송", { exact: false }),
    ).toBeVisible();
  });
});

test("essential content is visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "기본을 지키는 일에서", exact: false }),
  ).toBeVisible();
  await context.close();
});
