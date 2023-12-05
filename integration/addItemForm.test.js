describe('addItemForm', ()=>{
   it('base example, visually looks correct', async ()=>{

      await page.goto(
        "http://localhost:6009/iframe.html?args=&globals=backgrounds.value:!hex(F8F8F8)&id=additemform-component--add-item-form-base-exapmle&viewMode=story"
      );
      const image = await page.screenshot()

      expect(image).toMatchInlineSnapshot()
   })
})