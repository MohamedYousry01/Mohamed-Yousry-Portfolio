import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const pages = ['/', '/about/', '/experience/', '/projects/', '/contact/', '/projects/icu-ventilator-firmware/', '/projects/hardware-backed-cybersecurity/', '/projects/secure-boot-firmware-update/', '/projects/real-time-control-algorithms/', '/projects/safety-critical-verification/','/projects/medical-device-compliance/'];

test('every page loads, has valid metadata and accessible content on desktop and mobile', async ({page}) => {
  const errors: string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({width,height:960});
    for (const path of pages) {
      const response=await page.goto(path);
      expect(response?.status(),path).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/.+/);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
      expect(overflow,`${path} overflows at ${width}`).toBe(false);
      const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      expect(axe.violations,`${path} at ${width}: ${JSON.stringify(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))}`).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
});

test('walkthrough switches all scenes and pauses diagram motion',async ({page})=>{
  await page.goto('/');
  const explorer=page.locator('.explorer');
  await explorer.scrollIntoViewIfNeeded();
  const buttons=explorer.locator('.scene-selector button');
  await expect(buttons).toHaveCount(5);
  for(let i=0;i<5;i++) {
    await buttons.nth(i).click();
    await expect(buttons.nth(i)).toHaveAttribute('aria-pressed','true');
    await expect(explorer.locator('.counter')).toHaveText(`${String(i+1).padStart(2,'0')} / 05`);
    await expect(explorer.locator('svg[role="img"]')).toHaveCount(1);
  }
  await explorer.getByRole('button',{name:'Next scene',exact:true}).click();
  await expect(buttons.nth(0)).toHaveAttribute('aria-pressed','true');
  await explorer.getByRole('button',{name:'Pause diagram motion'}).click();
  await expect(explorer).toHaveClass(/motion-paused/);
  const state=await explorer.locator('.signal').first().evaluate(el=>getComputedStyle(el).animationPlayState);
  expect(state).toBe('paused');
});

test('control demonstration responds to input and exposes generated data',async ({page})=>{
  await page.goto('/projects/real-time-control-algorithms/');
  const lab=page.locator('.control-lab');
  await lab.scrollIntoViewIfNeeded();
  const before=await lab.locator('.lab-result strong').innerText();
  await lab.getByLabel('Damping', {exact:false}).fill('0.9');
  await expect(lab.locator('.lab-result strong')).not.toHaveText(before);
  await lab.getByLabel('Disturbance at 5 s').uncheck();
  await expect(lab.locator('.control-plot').getByText('Disturbance',{exact:true})).toHaveCount(0);
  await lab.getByText('Inspect the model and accessible data').click();
  await expect(lab.getByRole('table')).toBeVisible();
  await expect(lab.locator('tbody tr')).toHaveCount(11);
});

test('keyboard skip link, native mobile menu, routing and reduced motion',async ({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByText('Skip to content',{exact:true})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.locator('.mobile-nav summary').click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Projects',exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await page.locator('.project-card').first().click();
  await expect(page).toHaveURL(/icu-ventilator-firmware/);
  await page.goto('/');
  await page.locator('.explorer').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button',{name:'Pause diagram motion'})).toBeDisabled();
  const animation=await page.locator('.hero-art .signal').first().evaluate(el=>getComputedStyle(el).animationName);
  expect(animation).toBe('none');
});

test('capture representative desktop and mobile designs',async({page})=>{
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto('/');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true});
    await page.goto('/projects/real-time-control-algorithms/');
    await page.screenshot({path:`test-results/control-${width}.png`,fullPage:true});
  }
});
